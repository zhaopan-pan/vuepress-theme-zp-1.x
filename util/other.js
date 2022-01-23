/* eslint-disable no-proto */
export function interceptRouterError(router) {
	// 获取原型对象上的 push 函数
	const originalPush = router.__proto__.push
	// 修改原型对象中的p ush 方法
	router.__proto__.push = function push(location) {
		return originalPush.call(this, location).catch((err) => err)
	}
}

export function fixRouterError404(router) {
	router.beforeEach((to, from, next) => {
		// 解决非ASCII文件名的路由, 防止 404
		const decodedPath = decodeURIComponent(to.hash)

		if (decodedPath !== to.hash) {
			next(
				Object.assign({}, to, {
					hash: decodeURIComponent(to.hash),
				})
			)
		} else {
			next()
		}
	})
}
