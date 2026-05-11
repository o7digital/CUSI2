'use client'

import { useEffect } from 'react'

type LocaleHtmlLangProps = {
  lang: string
}

export default function LocaleHtmlLang({ lang }: LocaleHtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}
