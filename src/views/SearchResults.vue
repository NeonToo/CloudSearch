<template>
    <div>
        <x-header></x-header>
        <main>
            <div>找到约{{result.data.length}}条结果</div>
            <div id="content-container">
                <div id="items-container">
                    <article class="item-container" v-for="item in result.data" :key="item.doc_id">
                        <header>
                            <h3 class="item-title"><a :href="item.url">{{item.title}}</a></h3>
                            <span>收藏</span>
                        </header>
                        <p class="item-detail">{{item.detail}}</p>
                        <footer>{{item.url}}</footer>
                    </article>
                </div>
                <aside>
                    <h4>推荐网站</h4>
                    <ul>
                        <li>Google</li>
                        <li>百度</li>
                        <li>区块链</li>
                    </ul>
                </aside>
            </div>
        </main>
    </div>
</template>

<script>
    import Header from './../components/header/Header.vue';
    import SearchBar from './../components/search/SearchBar.vue';

    export default {
        components: {
            'x-header': Header,
            SearchBar
        },
        data() {
            return {
                result: {code: 0, data: []}
            };
        },
        created() {
            this.getResults();
        },
        methods: {
            getResults() {
                const that = this;
                that.result = {
                    "code": 1,
                    "data": [
                        {
                            "doc_id": "132301",
                            "title": "青岛将建设区块链产业四大平台|区块链|建设|应用测试_新浪科技_新浪网",
                            "detail": "青岛7月12日电（记者张旭东）近年兴起的<font color=#FF0000>区块链</font>技术是继互联网、无线通信、云计算、大数据......的又一创新。青岛市市北区近日提出，将建设<font color=#FF0000>区块链</font>产业孵化平台、<font color=#FF0000>区块链</font>应用测试平台、<font color=#FF0000>区块链</font>......北区近日提出，将建设<font color=#FF0000>区块链</font>产业孵化平台、<font color=#FF0000>区块链</font>应用测试平台、<font color=#FF0000>区块链</font>专项教育培训平台和区......<font color=#FF0000>区块链</font>产业孵化平台、<font color=#FF0000>区块链</font>应用测试平台、<font color=#FF0000>区块链</font>专项教育培训平台和<font color=#FF0000>区块链</font>资格认证平台。......链应用测试平台、<font color=#FF0000>区块链</font>专项教育培训平台和<font color=#FF0000>区块链</font>资格认证平台。青岛<font color=#FF0000>区块链</font>产业研究院......培训平台和<font color=#FF0000>区块链</font>资格认证平台。青岛<font color=#FF0000>区块链</font>产业研究院院长郭峰介绍说，<font color=#FF0000>区块链</font>技术是由......　　青岛区块... ",
                            "url": "http://tech.sina.com.cn/i/2017-07-12/doc-ifyhwehx5773511.shtml",
                            "cached": true,
                            "stared": false
                        },
                        {
                            "doc_id": "129355",
                            "title": "国家互金专委会：很多区块链项目都是炒作、滥竽充数|国家互金专委会|区块链_新浪科技_新浪网",
                            "detail": "随着比特币等虚拟货币的火热，其底层技术<font color=#FF0000>区块链</font>在国内外引起了广泛关注。目前<font color=#FF0000>区块链</font>正在向......层技术<font color=#FF0000>区块链</font>在国内外引起了广泛关注。目前<font color=#FF0000>区块链</font>正在向金融和其他领域扩展应用，问题较为突......应用，问题较为突出，具体如下：一、<font color=#FF0000>区块链</font>应用中存在的问题1、金融领域应用 ......应用（1）虚拟数字货币方面，目前<font color=#FF0000>区块链</font>技术的成熟应用主要体现在虚拟数字货币方面......、恐怖融资等活动提供了便利。（2）<font color=#FF0000>区块链</font>融资方面，部分<font color=#FF0000>区块链</font>应用在通过ICO的形......了便利。（2）<font color=#FF0000>区块链</font>融资方面，部分<font color=#FF0000>区块链</font>应用在通过ICO的形式融资，在ICO项目......领域应用...",
                            "url": "http://tech.sina.com.cn/i/2017-08-23/doc-ifykiuaz0162043.shtml",
                            "cached": true,
                            "stared": false
                        }
                    ]
                };
            }
        }
    }
</script>

<style>
    main {
        margin: 50px 10% 0 10%;
    }

    #content-container {
        display: flex;
        justify-content: space-between;
    }

    #items-container {
        width: 70%;
    }

    .item-container {
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #e1e4e8;
    }

    .item-title {
        max-width: 75%;
        color: #3399FF;
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;/* IE/Safari */
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;/* Opera */
    }

    .item-detail {
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;/* IE/Safari */
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;/* Opera */
    }
</style>