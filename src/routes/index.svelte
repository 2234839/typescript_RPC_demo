<script lang="typescript">
		import Button from "@smui/button";

		import { API } from "../rpc";
		let serverTime = null;
		function getServeTime() {
		  API.currentTime()
		    .then(r => {
		      serverTime = r;
		      console.log("服务器当前时间", r);
		    })
		    .catch(e => {
		      console.error(e);
		    });
		}

		let serverTime2 = null;
		function getServeTime2() {
		  API.currentTime2(true)
		    .then(r => {
		      serverTime2 = r;
		      console.log("服务器当前时间本地化文本", serverTime2);
		    })
		    .catch(e => {
		      console.error(e);
		    });
		}
</script>

<Button on:click={()=>getServeTime()}>点我获取服务器时间</Button>
{serverTime}

<Button on:click={()=>getServeTime2()}>点我获取服务器时间本地化文本</Button>
{serverTime2}