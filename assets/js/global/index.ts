// import "./header"
import "./footer"
import "./lqip"

/**
 * Delete all service workers from previous
 */
navigator?.serviceWorker?.getRegistrations?.().then(function (registrations) {
 for (let registration of registrations) {
  registration.unregister()
 }
})
