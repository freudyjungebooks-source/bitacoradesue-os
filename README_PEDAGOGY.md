
# Reglas de Silencio Pedagógico (Arquitectura Técnica)

Este proyecto implementa un **Silencio Pedagógico Adulto** mediante auditoría de código estática. La UI no debe reaccionar a la calidad de la escritura del usuario.

## Principios Técnicos Bloqueantes

1.  **Independencia de Contenido:** Ninguna clase de Tailwind o estilo inline puede depender de variables como `content`, `value` o `relato`.
2.  **Estados Autorizados:** Solo los estados funcionales (`isProcessing`, `isRecording`, `systemMode`) pueden activar cambios visuales.
3.  **Componentes de Guardia:** Todo componente `Pedagogical*` o `Linguistic*` debe estar envuelto en una condición de `pedagogy === 'present'`.

## Ejemplos de Código Prohibido (Falla en CI)

```tsx
// ❌ ERROR: Feedback visual basado en longitud (Premio/Castigo implícito)
<div className={content.length > 100 ? 'text-green-500' : 'text-red-500'}>

// ❌ ERROR: Jerarquía dinámica basada en contenido
<h1 style={{ fontSize: content.includes('!') ? '2rem' : '1.5rem' }}>

// ❌ ERROR: Animación reactiva a la escritura
<textarea className={content.match(/[A-Z]/) ? 'animate-shake' : ''} />
```

## Ejemplos de Código Válido

```tsx
// ✅ CORRECTO: Estado funcional puro
<div className={isProcessing ? 'opacity-50' : 'opacity-100'}>

// ✅ CORRECTO: Modo de sistema explícito
<Header variant={systemMode === 'docente' ? 'detailed' : 'minimal'} />
```
