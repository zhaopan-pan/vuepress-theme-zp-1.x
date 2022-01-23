<template>
	<div class="article-Info">
		<ZpIcon icon="person" v-if="title" :text="title" />
		<ZpIcon
			icon="date"
			v-if="articleInfo.frontmatter.date"
			:text="new Date(articleInfo.frontmatter.date).toLocaleDateString()"
		/>
		<ZpIcon
			icon="book1"
			isTag
			:clickEv="() => goTags(articleInfo.frontmatter.tag)"
			v-if="articleInfo.frontmatter.tag"
			:text="renderTagText(articleInfo.frontmatter.tag)"
		/>
		<ZpIcon icon="view" hasSlot v-if="!isList">
			<AccessCount :path="isList ? '/' : articleInfo.path" />
		</ZpIcon>
	</div>
</template>
<!-- <AccessNumber :idVal="articleInfo.path" :numStyle="numStyle"></AccessNumber> -->

<script>
import AccessCount from '@theme/components/Valine/AccessCount'
import {goTags, renderTagText} from '@theme/util'
import ZpIcon from '@theme/components/ZpIcon'
export default {
	name: 'ArticleInfo',
	components: {AccessCount, ZpIcon},
	props: {
		articleInfo: {type: Object, default: {}},
		currentTag: {type: String, default: ''},
		isList: {type: Boolean, default: false}, //是否
	},
	computed: {
		title() {
			return (
				this.articleInfo.frontmatter.author ||
				this.$themeConfig.author ||
				this.$site.title
			)
		},
	},
	mounted() {},
	data() {
		return {
			numStyle: {
				fontSize: '.9rem',
				fontWeight: 'normal',
				color: '#999',
			},
			goTags: goTags,
			renderTagText,
		}
	},

	methods: {},
}
</script>

<style lang="stylus" scoped>
.article-Info {
  display: flex;
  justify-content: start;

  .iconfont {
    display: inline-block;
    line-height: 1.5rem;

    &:not(:last-child) {
      margin-right: 0.8rem;
    }

    span {
      // margin-left: 0.5rem;
    }
  }

  .tags {
    .tag-item {
      cursor: pointer;

      &:first-child {
        margin-left: 0.5rem;
      }

      &.active {
        color: $accentColor;
      }

      &:hover {
        color: $accentColor;
        transform: scale(1.15);
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-left: 0 !important;
  }

  .article-Info {
    flex-wrap: wrap;
  }
}
</style>
