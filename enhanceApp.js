/* eslint-disable no-proto */
import Mixin from '@theme/mixins'
import { fixRouterError404, interceptRouterError } from '@theme/util/other'

export default ({
    Vue,
    siteData,
    isServer,
    router
}) => {
    Vue.mixin(Mixin)
    interceptRouterError(router)
    fixRouterError404(router)
}
