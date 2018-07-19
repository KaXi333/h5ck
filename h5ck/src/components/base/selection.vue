<template>
	<div class="selection-component">
		<div class="selection-show" @click="toggleDrop">
        	<p class="selection-value">{{selections[nowIndex].value}}<span>{{selections[nowIndex].label}}</span>
        	</p>
        	<img src="../../common/images/sjx.png">
      	</div>
      	<div class="selection-list" v-if="isDrop">
	        <ul>
	          <li @click="chooseSelection(index)" :class="{chooClasscolor:item.index===nowIndex}" v-for="(item,index) in selections">{{item.value}}<span>{{item.label}}</span></li>
	        </ul>
        </div>
	</div>
</template>

<script>
export default {
	props:{
		selections:{
			type:Array,
			default:[{
				label:'test',
				value:0
			}]
		}
	},
	data () {
	    return {
	    	isDrop:false,
	    	nowIndex:0
		} 
	},
	methods:{
		toggleDrop(){
			this.isDrop=!this.isDrop
			this.popupVisible = true
		},
		chooseSelection(index){
			this.nowIndex=index
			this.isDrop=false
			this.$emit('on-change',this.nowIndex)
		}
	}
}
</script>

<style scoped>
	.selection-component {
		position: relative;
		color: #666;

	}
	.icon-sanjiao{font-size: 50px;float: right}
	.selection-show {
		position: relative;
	    border: 1px solid #090103;
	    cursor: pointer;
	    height: 30px;
	    line-height: 30px;
	    font-size: 16px;
	    padding: 0 10px;
	    border-radius: 4px;
	    z-index: 100;
	}
	.selection-show p{
		height:30px;
		line-height: 30px;
	}
	.selection-show img{
		position: absolute;
		right:10px;
		top:0;
		bottom:0;
		margin:auto;
	}
	.selection-show p span{
		color: #1a1a1a;
		font-weight: bold;
		margin-left: 8px;
	}
	.selection-list {
		position: absolute;
		left:0;
	    width: 100%;
	    background: #fff;
	    border: 1px solid #e5e5e5;
	    z-index: 5;
	}
	.selection-list ul{
		padding-left: 10px;
		margin-bottom: 0;
	}
	.selection-list li {
	  padding: 9px 0;
	  cursor: pointer;
	  font-size: 16px;
	}
	.selection-list li span {
	  color: #1a1a1a;
	  font-weight: bold;
	  margin-left: 8px;
	}
	.chooClasscolor{color:#1a1a1a;}
</style>