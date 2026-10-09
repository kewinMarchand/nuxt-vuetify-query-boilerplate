export const A11Y_MODE_STORAGE_KEY = 'a11y-mode'
export const A11Y_MODE_ENHANCED = 'enhanced'

export const A11Y_MODE_BOOT_SCRIPT = `try{if(localStorage.getItem('${A11Y_MODE_STORAGE_KEY}')==='${A11Y_MODE_ENHANCED}')document.documentElement.dataset.a11yMode='${A11Y_MODE_ENHANCED}'}catch(e){console.warn(e)}`

export const JS_FLAG_SCRIPT = "document.documentElement.dataset.js=''"
