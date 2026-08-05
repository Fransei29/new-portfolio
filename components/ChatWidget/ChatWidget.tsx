'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { Send, Sparkles, X, ArrowUpRight, FileText, Layers } from 'lucide-react';
import styles from './ChatWidget.module.scss';
import { useLanguage } from '../../contexts/LanguageContext';

interface ChatReference {
  kind: 'project' | 'article';
  title: string;
  subtitle: string;
  url: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  reference?: ChatReference | null;
}

const MAX_MESSAGE_LENGTH = 500;
const SUGGESTION_KEYS = ['ai.q1', 'ai.q2', 'ai.q3', 'ai.q4'] as const;

const URL_PATTERN = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?])|([\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Convierte urls y emails sueltos del texto en enlaces clicables. */
function renderWithLinks(text: string) {
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    // La regex es global y guarda lastIndex entre llamadas; se instancia por
    // línea para que cada una arranque desde cero.
    const pattern = new RegExp(URL_PATTERN.source, 'g');
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(line)) !== null) {
      const value = match[0];
      const start = match.index;

      if (start > cursor) parts.push(line.slice(cursor, start));

      const isEmail = !value.startsWith('http');
      parts.push(
        <a
          key={`${lineIndex}-${start}`}
          href={isEmail ? `mailto:${value}` : value}
          target={isEmail ? undefined : '_blank'}
          rel={isEmail ? undefined : 'noopener noreferrer'}
          className={styles.messageLink}
        >
          {value}
        </a>
      );
      cursor = start + value.length;
    }

    if (cursor < line.length) parts.push(line.slice(cursor));

    return (
      <Fragment key={lineIndex}>
        {parts}
        {lineIndex < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputValue]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (raw?: string) => {
      const text = (raw ?? inputValue).trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!text || isLoading) return;

      const userMessage: Message = {
        id: `${Date.now()}-user`,
        role: 'user',
        text,
        timestamp: new Date(),
      };

      // El historial se arma antes de actualizar el estado: setMessages es
      // asíncrono y leer `messages` acá daría la lista sin este mensaje.
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.text,
      }));

      // El servidor no guarda sesión, así que las referencias ya mostradas
      // viajan con el request para que no se repita el mismo link.
      const usedUrls = messages
        .map((m) => m.reference?.url)
        .filter((u): u is string => Boolean(u));

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      if (textareaRef.current) textareaRef.current.style.height = 'auto';

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, usedUrls }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant`,
            role: 'assistant',
            text: data.response || t('ai.error'),
            timestamp: new Date(),
            reference: data.reference ?? null,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-error`,
            role: 'assistant',
            text: t('ai.error'),
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages, t]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatWidget}>
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t('ai.title')}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={22} className={styles.chatIcon} />
        ) : (
          <Sparkles size={22} className={styles.chatIcon} />
        )}
      </button>

      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-label={t('ai.title')}>
          <div className={styles.chatHeader}>
            <h3>{t('ai.title')}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.length === 0 && (
              <>
                <div className={styles.welcomeMessage}>{t('ai.welcome')}</div>
                <div className={styles.suggestedQuestions}>
                  <p className={styles.suggestedTitle}>{t('ai.suggestedTitle')}</p>
                  {SUGGESTION_KEYS.map((key) => (
                    <button
                      key={key}
                      className={styles.suggestedQuestion}
                      onClick={() => sendMessage(t(key))}
                      disabled={isLoading}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                <div className={styles.messageContent}>{renderWithLinks(message.text)}</div>

                {message.reference && (
                  <a
                    href={message.reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.referenceCard}
                  >
                    <span className={styles.referenceKind}>
                      {message.reference.kind === 'article' ? (
                        <FileText size={13} aria-hidden />
                      ) : (
                        <Layers size={13} aria-hidden />
                      )}
                      {message.reference.kind === 'article'
                        ? t('ai.refArticle')
                        : t('ai.refProject')}
                    </span>
                    <span className={styles.referenceTitle}>{message.reference.title}</span>
                    {message.reference.subtitle && (
                      <span className={styles.referenceSubtitle}>
                        {message.reference.subtitle}
                      </span>
                    )}
                    <span className={styles.referenceAction}>
                      {t('ai.refOpen')}
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </a>
                )}

                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.typingIndicator} aria-label={t('ai.thinking')}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyDown={handleKeyDown}
              placeholder={t('ai.placeholder')}
              className={styles.input}
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
              aria-label={t('ai.send')}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
