import React from 'react'

export default function MatomoTracker() {
  console.info('MatomoTracker is enabled')
  React.useEffect(() => {
    var _mtm = (window._mtm = window._mtm || [])
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src =
      'https://cdn.matomo.cloud/journalofdigitalhistory.matomo.cloud/container_zOagv1Nw.js'
    s.parentNode.insertBefore(g, s)
  }, [])

  return null
}
