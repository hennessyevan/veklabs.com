import "./header"
import "./favicon"

/**
 * Delete all service workers from previous
 */
navigator.serviceWorker.getRegistrations().then(function (registrations) {
 for (let registration of registrations) {
  registration.unregister()
 }
})
