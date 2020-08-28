<template>
	<div class="tree-wrapper">
		<collections-tree-node v-for="col in collections" :key="col['@id']" :collection="col"></collections-tree-node>
	</div>
</template>

<script>
import CollectionsTreeNode from '@/components/CollectionsTreeNode';

export default {
	name: 'CollectionsTree',
	components: {
		CollectionsTreeNode,
	},
	props: {
		collections: {
			type: Array,
			default() {
				return [];
			},
		},
	},

};
</script>

<style scoped>

</style>
