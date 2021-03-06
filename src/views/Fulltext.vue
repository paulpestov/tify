<template>
	<section class="tify-fulltext">
		<h2 class="tify-sr-only">{{ 'Fulltext'|trans }}</h2>

		<div v-if="fulltextAvailable" class="tify-fulltext_texts">
			<template v-for="(page, index) in pages">
				<hr :key="index" v-if="index && page > 1" class="tify-fulltext_separator">
				<div :key="index" v-for="(text, index) in fulltexts[page]" class="tify-fulltext_text" v-html="text">
				</div>
			</template>
		</div>
		<div v-else class="tify-fulltext_none">
			{{ 'Fulltext not available for this page'|trans }}
		</div>
	</section>
</template>

<script>
import httpClient from '@/services/http-client';

export default {
	data() {
		return {
			fulltextAvailable: false,
			fulltexts: [],
		};
	},
	watch: {
		// eslint-disable-next-line func-names
		'$root.params.pages': function () {
			this.loadFulltexts();
		},
	},
	methods: {
		loadFulltexts() {
			this.fulltextAvailable = false;
			this.fulltexts = [];

			this.$root.params.pages.forEach((page) => {
				if (page < 1 || this.fulltexts[page]) return;

				const canvas = this.$root.canvases[page - 1];
				if (!('otherContent' in canvas)) return;

				this.$set(this.fulltexts, page, []);

				const annotationListUrl = canvas.otherContent[0]['@id'];
				httpClient.get(annotationListUrl).then((response) => {
					const { resources } = response.data;
					if (!Array.isArray(resources)) return;

					resources.forEach((resource, index) => {
						const res = resource.resource;
						if (res && res.chars) {
							const text = this.$root.filterHtml(res.chars);
							if (text) this.fulltextAvailable = true;
							this.$set(this.fulltexts[page], index, text);
						} else if (res['@id']) {
							this.loadRemoteFulltext(page, index, res['@id']);
						}
					});
				}, (error) => {
					const status = (error.response ? error.response.statusText : error.message);
					this.$root.error = `Error loading other content: ${status}`;
				});
			});
		},
		loadRemoteFulltext(page, index, url) {
			httpClient.get(url).then((response2) => {
				const text = this.$root.filterHtml(response2.data);
				if (text) this.fulltextAvailable = true;
				this.$set(this.fulltexts[page], index, text);
			}, (error) => {
				const status = (error.response ? error.response.statusText : error.message);
				this.$root.error = `Error loading fulltext: ${status}`;
			});
		},
	},
	mounted() {
		this.loadFulltexts();
	},
	computed: {
		pages() {
			return this.$root.params.pages.filter((page) => !!(page));
		},
	},
};
</script>
