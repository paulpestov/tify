<template>
<div class="collection-tree-node">
	<button
			:title="$options.filters.trans(isExpanded ? 'Collapse' : 'Expand')"
			@click="getChildren()"
	>
		<template v-if="isExpanded">
			<icon name="remove"/>
			<span class="tify-sr-only">{{ 'Collapse'|trans }}</span>
		</template>
		<template v-else>
			<icon name="add"/>
			<span class="tify-sr-only">{{ 'Expand'|trans }}</span>
		</template>
	</button>
	<div class="label">{{label}}</div>
	<collections-tree-node v-for="col in childCollections" :key="col['@id']" :collection="col"></collections-tree-node>
</div>
</template>

<script>
import httpClient from '@/services/http-client';
import CollectionsTreeNode from '@/components/CollectionsTree';

export default {
	name: 'CollectionsTreeNode',
	components: {
		CollectionsTreeNode,
	},
	props: ['collection'],
	data() {
		return {
			isExpanded: false,
			childCollections: [],
		};
	},
	computed: {
		label() {
			return this.collection ? this.$root.convertValueToArray(this.collection.label)[0] : '';
		},
	},
	methods: {
		getChildren() {
			this.isExpanded = true;
			httpClient.get(this.collection['@id']).then(({ data }) => {
				if (data.collections) {
					this.childCollections = data.collections;
				}
			});
		},
	},
};
</script>

<style scoped>

</style>
