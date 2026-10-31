export const COLOR_SCHEME_STORAGE_KEY = 'color-scheme'
export const COLOR_SCHEMES = ['auto', 'light', 'dark'] as const

export type ColorScheme = (typeof COLOR_SCHEMES)[number]

// Exécuté avant le rendu, dans le même script que le mode renforcé : le HTML servi porte « auto », le choix mémorisé le remplace sans flash.
export const COLOR_SCHEME_BOOT_SCRIPT = `try{var c=localStorage.getItem('${COLOR_SCHEME_STORAGE_KEY}');if(c==='light'||c==='dark')document.documentElement.dataset.colorScheme=c}catch(e){console.warn(e)}`
