function easeInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
}

/**
 * 滚动动画函数
 * @param {*} unit 每帧增加单位数
 * @param {*} fromTopNum 开始位置
 * @param {*} allTime 最大阈值
 */
export default function animationSrcoll(unit, fromTopNum, allTime) {
    let currentTime = 0 // 初始值
    const srcoll = function () {
        currentTime += unit
        window.scrollTo(0, easeInOut(
            currentTime,
            fromTopNum, // 开始
            -fromTopNum, // 结束
            allTime
        ))
        if (currentTime <= allTime && fromTopNum > 0) {
            requestAnimationFrame(srcoll)
        }
    }
    requestAnimationFrame(srcoll)
}