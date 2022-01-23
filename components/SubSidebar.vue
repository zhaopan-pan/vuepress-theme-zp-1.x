<script>
import {isActive, hashRE, groupHeaders} from '../util'

export default {
	functional: true,

	props: ['item', 'sidebarDepth'],

	render(
		h,
		{
			parent: {
				$page,
				$route,
				$showSubSideBar,
				$themeConfig,
				$themeLocaleConfig,
			},
			props: {item, sidebarDepth},
		}
	) {
		const headers = $showSubSideBar ? $page.headers || [] : []
		return h(
			'ul',
			{
				class: {'sub-sidebar-wrapper': true, 'side-bar': true},
				style: {width: headers && headers.length > 0 ? '12rem' : '0'},
			},
			[
				...headers.map((header) => {
					return h(
						'li',
						{
							class: {
								active: isLinkActive(
									header,
									$route,
									$page.path
								),
								[`level-${header.level}`]: true,
							},
							attr: {key: header.title},
						},
						[
							h(
								'router-link',
								{
									class: {
										'sidebar-link': true,
										[`zp-side-${header.slug}`]: true,
									},
									props: {
										to: `${$page.path}#${header.slug}`,
									},
								},
								header.title
							),
						]
					)
				}),
			]
		)
	},
}
function isLinkActive(header, $route, path) {
	const active = isActive($route, path + '#' + header.slug)
	if (active) {
		setTimeout(() => {
			document
				.querySelector(`.zp-side-${decodeURI(header.slug)}`)
				.scrollIntoView()
		}, 100)
	}
	return active
}
</script>

<style lang="stylus" scoped>
.sub-sidebar-wrapper
  width 12rem
  padding-left 0
  list-style none
  font-size 12px
  li
    padding .2rem 0
    cursor pointer
    border-left 1px solid var(--border-color)
    a
      padding 0.35rem 1rem 0.35rem 0rem
      color var(--text-color)
    &:hover
      a
       color $accentColor
    &.active
      border-left 1px solid $accentColor
      a
       color $accentColor
    &.level-1
      padding-left .4rem
    &.level-2
      padding-left .9rem
    &.level-3
      padding-left 1.5rem
</style>
