<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as d3 from 'd3';

const chart = ref(null);
const responseData = ref([]);
const showModal = ref(false);
const showData =  ref({});

function selectedNode(event, d) {
  showModal.value = true;
  showData.value = d.data.data;
}

function closeModal() {
  showModal.value = !showModal.value;
  showData.value = {};
}

onMounted(async () => {
  // it will fetch the data from server
  await axios.get('http://localhost:3000/tree-data').then((response) => {
    responseData.value = response.data;
  });

  const treeData = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(responseData.value.data);

  const width = 600;
  const height = 400;

  const svg = d3.select(chart.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(50,50)');

  const treeLayout = d3.tree().size([width - 100, height - 100]);
  const rootNode = d3.hierarchy(treeData);

  treeLayout(rootNode);

  const nodes = svg.selectAll('.node')
    .data(rootNode.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  nodes.append('rect')
    .on("click", selectedNode)
    .attr('width', 80)
    .attr('height', 30)
    .attr('fill', 'lightblue')
    .attr('stroke', 'blue')
    .attr('cursor', 'pointer')
    .attr('stroke-width', '2px');
    
  nodes.append('text')
    .text(d => d.data.data.name)
    .attr('x', 40)
    .attr('y', 20)
    .on("click", selectedNode)
    .attr('text-anchor', 'middle')
    .attr('cursor', 'pointer')
    .attr('dominant-baseline', 'middle')
    .attr('fill', 'black');

  const links = svg.selectAll('.link')
    .data(rootNode.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', '2px')
    .attr('d', d => {
      return `M ${d.source.x + 35},${d.source.y + 30} L ${d.target.x + 15},${d.target.y}`});
});
 
</script>

<template>
  <div v-if="showModal" id="pop-hover">
    <div
      id="pop-up-modal"
    >
      <div id="title"> {{ showData.name }}</div>
      <div id="description"> {{ showData.description }}</div>
    </div>
    <div id="close" @click="closeModal">X</div>
  </div>
  <div ref="chart" id="treeChart"></div>
</template>

<style>
#pop-hover {
  display: flex;
}
#pop-up-modal {
  width: 300px;
  height: 150px;
  background: #e7373733;
  color: black;
  border-radius: 1px;
  display: grid;
  margin-left: 5px;

  div {
    margin-left: 15px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
}
#close  {
  color: white;
  cursor: pointer;
  background: olivedrab;
  height: max-content;
  width: 23px;
  text-align: center;
  font-weight: bold;
}
</style>