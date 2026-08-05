import type { CaseStudyDeepDive, CaseStudyGroup } from '../../app/data/caseStudy';
import styles from './DeepDiveSection.module.scss';

interface Props {
  dive: CaseStudyDeepDive;
  heading?: string;
  icon?: React.ReactNode;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item, index) => (
        <li key={index} className={styles.bullet}>
          <span className={styles.bulletMark} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className={styles.chips}>
      {items.map((item, index) => (
        <li key={index} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Group({ group }: { group: CaseStudyGroup }) {
  return (
    <section className={styles.group} data-case-section>
      <h3 className={styles.groupTitle}>{group.title}</h3>
      {group.body && <p className={styles.groupBody}>{group.body}</p>}
      {group.bullets && group.bullets.length > 0 && <Bullets items={group.bullets} />}
      {group.chips && group.chips.length > 0 && <Chips items={group.chips} />}
    </section>
  );
}

export default function DeepDiveSection({ dive, heading, icon }: Props) {
  return (
    <div className={styles.wrap}>
      {heading && (
        <div className={styles.heading} data-case-section>
          {icon && (
            <span className={styles.headingIcon} aria-hidden>
              {icon}
            </span>
          )}
          <h2 className={styles.headingText}>{heading}</h2>
        </div>
      )}

      {dive.body && (
        <p className={styles.intro} data-case-section>
          {dive.body}
        </p>
      )}

      {dive.bullets && dive.bullets.length > 0 && (
        <div data-case-section>
          <Bullets items={dive.bullets} />
        </div>
      )}

      {dive.groups?.map((group) => (
        <Group key={group.title} group={group} />
      ))}
    </div>
  );
}
