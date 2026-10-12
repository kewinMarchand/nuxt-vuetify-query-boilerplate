import { pageViewCommands, setupCommands } from './matomo'

import type { MatomoCommand, MatomoConfig } from './matomo'

declare global {
  interface Window {
    _paq?: { push: (command: MatomoCommand) => unknown }
  }
}

const push = (commands: MatomoCommand[]) => {
  const pending: MatomoCommand[] = []
  const queue = (window._paq ??= pending)
  commands.forEach((command) => queue.push(command))
}

/** Désactive les cookies, injecte `matomo.js` en asynchrone, puis envoie une page vue par appel. */
export const startMatomo = (config: MatomoConfig) => {
  push(setupCommands(config))
  const script = document.createElement('script')
  script.async = true
  script.src = config.scriptUrl
  document.head.append(script)

  let previousUrl: string | undefined
  return {
    trackPageView: () => {
      const url = window.location.href
      push(pageViewCommands({ url, title: document.title, referrer: previousUrl }))
      previousUrl = url
    },
  }
}
