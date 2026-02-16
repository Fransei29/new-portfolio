# Instrucciones para Exportar Fasser a un Nuevo Repositorio

## ✅ Estado Actual

- **Rama `main`**: Limpia, contiene francoseiler.com como estaba antes del 23 de enero (commit `e4daef6`)
- **Rama `fasser`**: Contiene todos los cambios de Fasser con el progreso actual completo

## 📋 Pasos para Crear el Nuevo Repositorio de Fasser

### Opción 1: Crear nuevo repo desde la rama fasser (Recomendado)

```bash
# 1. Crear un nuevo directorio para el repo de Fasser
cd /home/franco/Documents/Personal/Current
mkdir fasser-website
cd fasser-website

# 2. Inicializar git
git init

# 3. Agregar el remote del repo actual (si quieres mantener la conexión)
# O simplemente copiar la rama fasser

# 4. Desde el repo actual, exportar la rama fasser
cd /home/franco/Documents/Personal/Current/new-portfolio
git checkout fasser

# 5. Copiar todos los archivos al nuevo directorio
# (excluyendo .git para empezar limpio)
rsync -av --exclude='.git' . /home/franco/Documents/Personal/Current/fasser-website/

# 6. En el nuevo directorio, inicializar git y hacer commit inicial
cd /home/franco/Documents/Personal/Current/fasser-website
git add .
git commit -m "Initial commit: Fasser website"

# 7. Crear repo en GitHub/GitLab y hacer push
git remote add origin <URL_DEL_NUEVO_REPO>
git push -u origin main
```

### Opción 2: Usar git bundle (Mantiene historial completo)

```bash
# 1. Desde el repo actual, crear un bundle de la rama fasser
cd /home/franco/Documents/Personal/Current/new-portfolio
git bundle create fasser-bundle.bundle fasser

# 2. Crear nuevo directorio y clonar desde el bundle
cd /home/franco/Documents/Personal/Current
mkdir fasser-website
cd fasser-website
git init
git pull /home/franco/Documents/Personal/Current/new-portfolio/fasser-bundle.bundle fasser

# 3. Renombrar la rama a main
git branch -M main

# 4. Agregar remote y hacer push
git remote add origin <URL_DEL_NUEVO_REPO>
git push -u origin main
```

### Opción 3: Fork/Clone y resetear (Más simple)

```bash
# 1. Clonar el repo actual
cd /home/franco/Documents/Personal/Current
git clone new-portfolio fasser-website
cd fasser-website

# 2. Cambiar a la rama fasser
git checkout fasser

# 3. Renombrar fasser a main
git branch -M fasser main

# 4. Eliminar el remote original y agregar el nuevo
git remote remove origin
git remote add origin <URL_DEL_NUEVO_REPO>

# 5. Hacer push
git push -u origin main
```

## 🔍 Verificación

Después de crear el nuevo repo, verifica que:

- ✅ El header muestra "FASSER" y "Software Studio"
- ✅ Los archivos `faser.png` y `faserA.png` están en `public/`
- ✅ `locales/en/common.json` tiene "Fasser Software Studio"
- ✅ `locales/en/contact.json` tiene "contact@fasser.com"
- ✅ Todos los componentes nuevos están presentes (WhyChooseUs, HowWeWork, FAQ, etc.)

## 📝 Notas Importantes

1. **No elimines la rama `fasser`** del repo actual hasta que hayas verificado que el nuevo repo funciona correctamente
2. **Actualiza las variables de entorno** en el nuevo repo (si hay alguna configuración específica)
3. **Revisa los remotes** después de crear el nuevo repo para asegurarte de que apunta al lugar correcto
4. **El repo actual (`main`)** ahora está limpio y listo para continuar con francoseiler.com

## 🚀 Próximos Pasos

1. Crear el nuevo repositorio en GitHub/GitLab
2. Elegir una de las opciones arriba para exportar
3. Configurar el deployment del nuevo repo de Fasser
4. Verificar que todo funciona correctamente
5. (Opcional) Eliminar la rama `fasser` del repo original una vez confirmado

