<template>
    <div>
        <x-header>
            <!--<search-bar slot="left"></search-bar>-->
            <!--<form @submit.prevent="search" slot="left">-->
            <div slot="left">
                <select-field :options="options"></select-field>
                <input type="text" class="search-input" v-model="keyword" placeholder="搜索" autocomplete="off">
                <button class="btn btn-primary search-btn" @click="search">搜索</button>
            </div>
            <!--</form>-->
        </x-header>
        <main id="graph"></main>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import * as d3 from 'd3';
    import Header from './../components/header/Header.vue';
    import SearchBar from './../components/search/SearchBar.vue';
    import SelectField from './../components/select/SelectField.vue';
    import Button from './../components/button/Button.vue';

    export default {
        components: {
            'x-header': Header,
            SelectField,
            'x-button': Button
        },
        data() {
            return {
                margin: {
                    top: 20,
                    right: 80,
                    bottom: 20,
                    left: 80
                },
                width: 1500,
                height: 1200,
                root: null,
                svg: null,
                tree: null,
                diagonal: null,
                options: [
                    {
                        label: '思维导图',
                        selected: true,
                        type: 'map'
                    },
                    {
                        label: '关键词',
                        selected: false,
                        type: 'keyword'
                    }
                ],
                keyword: this.$store.state.key,
                searchType: this.$store.searchType
            }
        },
        create() {
            this.setSearchType("keyword");
        },
        mounted() {
            this.initMap();
        },
        methods: {
            ...mapMutations([
                'setSearchType', 'setKey', 'submitSearchForm'
            ]),
            search() {
                console.log(this.keyword);
                if (this.keyword) {
                    const searchType = this.$store.state.searchType;

                    this.submitSearchForm({
                        searchType: searchType,
                        key: this.keyword
                    });
                    if (searchType === 'map') { // mind-map search
                        this.$router.push({
                            path: '/map'
                        });
                    } else { // keyword search
                        this.$router.push({
                            path: '/results',
                            query: {
                                key: this.keyword
                            }
                        });
                    }
                }
            },
            initMap() {
                this.svg = d3.select("#graph")
                    .append("svg")
                    .attr("width", this.width + this.margin.right + this.margin.left)
                    .attr("height", this.height + this.margin.top + this.margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
                // 树状图布局
                this.tree = d3.layout.tree().size([this.height, this.width]);
                // 对角线生成器
                this.diagonal = d3.svg.diagonal().projection(function (d) {
                    return [d.y, d.x];
                });
                this.root = {
                    "name": "便利店",
                    "children": [
                        {
                            "name": "基本信息",
                            "children": [
                                {
                                    "name": "定义",
                                    "children": [
                                        {
                                            "name": "便利店",
                                            "children": [
                                                {
                                                    "name": "无人便利店",
                                                    "children": [
                                                        {
                                                            "name": "无人售货机"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "特点",
                                    "children": [
                                        {
                                            "name": "精简SKU"
                                        },
                                        {
                                            "name": "极致便利",
                                            "children": [
                                                {
                                                    "name": "距离便利",
                                                    "children": [
                                                        {
                                                            "name": "布点较多"
                                                        },
                                                        {
                                                            "name": "辐射半径"
                                                        },
                                                        {
                                                            "name": "选址地点"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "时间便利",
                                                    "children": [
                                                        {
                                                            "name": "24小时便利店",
                                                            "children": [
                                                                {
                                                                    "name": "711"
                                                                },
                                                                {
                                                                    "name": "全家"
                                                                },
                                                                {
                                                                    "name": "好德"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "非24小时便利店",
                                                            "children": [
                                                                {
                                                                    "name": "红旗超市"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "营业时间灵活"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "商品的便利性"
                                                },
                                                {
                                                    "name": "交易的便利性"
                                                },
                                                {
                                                    "name": "服务的便利性",
                                                    "children": [
                                                        {
                                                            "name": "零售服务"
                                                        },
                                                        {
                                                            "name": "公共服务"
                                                        },
                                                        {
                                                            "name": "金融服务"
                                                        },
                                                        {
                                                            "name": "健康服务"
                                                        },
                                                        {
                                                            "name": "其他特色服务"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "name": "小型化"
                                        },
                                        {
                                            "name": "高毛利"
                                        }
                                    ]
                                },
                                {
                                    "name": "重大变革",
                                    "children": [
                                        {
                                            "name": "商品结构"
                                        },
                                        {
                                            "name": "成本"
                                        },
                                        {
                                            "name": "互联网"
                                        },
                                        {
                                            "name": "加盟比例"
                                        },
                                        {
                                            "name": "移动支付"
                                        },
                                        {
                                            "name": "新零售"
                                        },
                                        {
                                            "name": "人工智能"
                                        }
                                    ]
                                },
                                {
                                    "name": "发展历程",
                                    "children": [
                                        {
                                            "name": "百货"
                                        },
                                        {
                                            "name": "超市"
                                        },
                                        {
                                            "name": "便利店",
                                            "children": [
                                                {
                                                    "name": "主要地点",
                                                    "children": [
                                                        {
                                                            "name": "美国",
                                                            "children": [
                                                                {
                                                                    "name": "7-11"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "日本",
                                                            "children": [
                                                                {
                                                                    "name": "7-11"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "台湾",
                                                            "children": [
                                                                {
                                                                    "name": "青年商社"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "主要类型",
                                                    "children": [
                                                        {
                                                            "name": "加油站便利店"
                                                        },
                                                        {
                                                            "name": "传统便利店"
                                                        },
                                                        {
                                                            "name": "无人便利店",
                                                            "children": [
                                                                {
                                                                    "name": "美国",
                                                                    "children": [
                                                                        {
                                                                            "name": "Scan&Go模式",
                                                                            "children": [
                                                                                {
                                                                                    "name": "沃尔玛"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "name": "AmazonGo",
                                                                            "children": [
                                                                                {
                                                                                    "name": "亚马逊"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "name": "瑞典",
                                                                    "children": [
                                                                        {
                                                                            "name": "Ntraffa"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "name": "日本",
                                                                    "children": [
                                                                        {
                                                                            "name": "电子标签",
                                                                            "children": [
                                                                                {
                                                                                    "name": "罗森便利店"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "name": "无人收银",
                                                                            "children": [
                                                                                {
                                                                                    "name": "罗森便利店&松下"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "name": "韩国",
                                                                    "children": [
                                                                        {
                                                                            "name": "手付系统",
                                                                            "children": [
                                                                                {
                                                                                    "name": "7-11高端店"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "name": "中国",
                                                                    "children": [
                                                                        {
                                                                            "name": "缤果盒子"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "行业环境",
                                    "children": [
                                        {
                                            "name": "经济环境",
                                            "children": [
                                                {
                                                    "name": "GDP"
                                                },
                                                {
                                                    "name": "GDP与便利店关系"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "社会环境",
                                            "children": [
                                                {
                                                    "name": "中产阶级"
                                                },
                                                {
                                                    "name": "老龄化"
                                                },
                                                {
                                                    "name": "女性劳动参与率"
                                                },
                                                {
                                                    "name": "单身比例"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "行业整体格局",
                            "children": [
                                {
                                    "name": "产业链",
                                    "children": [
                                        {
                                            "name": "供应商",
                                            "children": [
                                                {
                                                    "name": "自营品牌"
                                                },
                                                {
                                                    "name": "采购"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "物流",
                                            "children": [
                                                {
                                                    "name": "B2B"
                                                },
                                                {
                                                    "name": "仓库",
                                                    "children": [
                                                        {
                                                            "name": "数字化仓储"
                                                        },
                                                        {
                                                            "name": "冷链"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "快递"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "选址"
                                        },
                                        {
                                            "name": "技术"
                                        },
                                        {
                                            "name": "教育培训"
                                        }
                                    ]
                                },
                                {
                                    "name": "优势品类",
                                    "children": [
                                        {
                                            "name": "日化用品"
                                        },
                                        {
                                            "name": "食品饮料"
                                        },
                                        {
                                            "name": "生鲜"
                                        },
                                        {
                                            "name": "烟酒"
                                        }
                                    ]
                                },
                                {
                                    "name": "价值取向"
                                },
                                {
                                    "name": "行业现状"
                                }
                            ]
                        },
                        {
                            "name": "主要企业",
                            "children": [
                                {
                                    "name": "日本便利店",
                                    "children": [
                                        {
                                            "name": "7-11"
                                        },
                                        {
                                            "name": "全家"
                                        },
                                        {
                                            "name": "罗森"
                                        }
                                    ]
                                },
                                {
                                    "name": "欧美便利店",
                                    "children": [
                                        {
                                            "name": "好市多"
                                        },
                                        {
                                            "name": "国内便利店"
                                        },
                                        {
                                            "name": "传统便利店",
                                            "children": [
                                                {
                                                    "name": "美宜佳"
                                                },
                                                {
                                                    "name": "快客"
                                                },
                                                {
                                                    "name": "易捷"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "企业管理",
                            "children": [
                                {
                                    "name": "市场营销",
                                    "children": [
                                        {
                                            "name": "消费者分析"
                                        },
                                        {
                                            "name": "促销方式"
                                        },
                                        {
                                            "name": "营销方式"
                                        }
                                    ]
                                },
                                {
                                    "name": "经营管理"
                                }
                            ]
                        },
                        {
                            "name": "投融资",
                            "children": [
                                {
                                    "name": "投资情况",
                                    "children": [
                                        {
                                            "name": "人工智能流派"
                                        },
                                        {
                                            "name": "物联网流派"
                                        },
                                        {
                                            "name": "互联网流派"
                                        }
                                    ]
                                },
                                {
                                    "name": "新品优选"
                                }
                            ]
                        },
                        {
                            "name": "技术理解",
                            "children": [
                                {
                                    "name": "典型技术企业",
                                    "children": [
                                        {
                                            "name": "亚马逊"
                                        },
                                        {
                                            "name": "深蓝科技"
                                        }
                                    ]
                                },
                                {
                                    "name": "入店"
                                }
                            ]
                        },
                        {
                            "name": "未来趋势",
                            "children": [
                                {
                                    "name": "产品趋势",
                                    "children": [
                                        {
                                            "name": "自有品牌"
                                        },
                                        {
                                            "name": "深度分销"
                                        },
                                        {
                                            "name": "社区大数据"
                                        }
                                    ]
                                },
                                {
                                    "name": "运营趋势"
                                },
                                {
                                    "name": "布局趋势"
                                },
                                {
                                    "name": "行业趋势"
                                }
                            ]
                        }
                    ]
                };
                // 给第一个节点添加初始坐标
                this.root.x0 = this.height / 2;
                this.root.y0 = 0;
                // 以第一个节点为起始节点，重绘
                this.redraw(this.root);
            },
            redraw(source) {
                console.log('redraw');
                const that = this;
                /*
                （1） 计算节点和连线的位置
                */
                //应用布局，计算节点和连线
                const nodes = this.tree.nodes(this.root);
                const links = this.tree.links(nodes);
                //重新计算节点的y坐标
                nodes.forEach(function (d) {
                    d.y = d.depth * 180;
                });
                /*
                （2） 节点的处理
                */
                //获取节点的update部分
                const nodeUpdate = d3.select("g").selectAll(".node")
                    .data(nodes, function (d) {
                        return d.name;
                    });
                //获取节点的enter部分
                const nodeEnter = nodeUpdate.enter();
                //获取节点的exit部分
                const nodeExit = nodeUpdate.exit();
                //1. 节点的 Enter 部分的处理办法
                const enterNodes = nodeEnter.append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    });
                enterNodes.append("circle")
                    .attr("r", 0)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .on("click", function (d) {
                        that.toggle(d);
                        that.redraw(d);
                    });
                enterNodes.append("text")
                    .attr("x", function (d) {
                        return d.children || d._children ? -14 : 14;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function (d) {
                        return d.name;
                    })
                    .style("fill-opacity", 0)
                    .on("click", function (d) {
                        that.keyword = `便利店 ${d.name}`;
                        that.setKey(`便利店 ${d.name}`);
                        console.log(that.keyword);
                        console.log(that.$store.state.key);
                    });
                //2. 节点的 Update 部分的处理办法
                const updateNodes = nodeUpdate.transition()
                    .duration(500)
                    .attr("transform", function (d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });
                updateNodes.select("circle")
                    .attr("r", 8)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });
                updateNodes.select("text")
                    .style("fill-opacity", 1);
                //3. 节点的 Exit 部分的处理办法
                const exitNodes = nodeExit.transition()
                    .duration(500)
                    .attr("transform", function (d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();
                exitNodes.select("circle")
                    .attr("r", 0);
                exitNodes.select("text")
                    .style("fill-opacity", 0);
                /*
                （3） 连线的处理
                */
                //获取连线的update部分
                const linkUpdate = d3.select("g").selectAll(".link")
                    .data(links, function (d) {
                        return d.target.name;
                    });
                //获取连线的enter部分
                const linkEnter = linkUpdate.enter();
                //获取连线的exit部分
                const linkExit = linkUpdate.exit();
                //1. 连线的 Enter 部分的处理办法
                linkEnter.insert("path", ".node")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        const o = {x: source.x0, y: source.y0};
                        return that.diagonal({source: o, target: o});
                    })
                    .transition()
                    .duration(500)
                    .attr("d", that.diagonal);
                //2. 连线的 Update 部分的处理办法
                linkUpdate.transition()
                    .duration(500)
                    .attr("d", that.diagonal);
                //3. 连线的 Exit 部分的处理办法
                linkExit.transition()
                    .duration(500)
                    .attr("d", function (d) {
                        const o = {x: source.x, y: source.y};
                        return that.diagonal({source: o, target: o});
                    })
                    .remove();
                /*
                （4） 将当前的节点坐标保存在变量x0、y0里，以备更新时使用
                */
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            },
            //切换开关，d 为被点击的节点
            toggle(d) {
                if (d.children) { //如果有子节点
                    d._children = d.children; //将该子节点保存到 _children
                    d.children = null;  //将子节点设置为null
                } else {  //如果没有子节点
                    d.children = d._children; //从 _children 取回原来的子节点
                    d._children = null; //将 _children 设置为 null
                }
            }
        }
    }
</script>

<style>
    #graph {
        margin-top: 100px;
    }

    .node circle {
        cursor: pointer;
        fill: #fff;
        stroke: steelblue;
        stroke-width: 2px;
    }

    .node text {
        font-size: 12px;
        cursor: pointer;
    }

    .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 1.5px;
    }

    .btn {
        padding: 6px 12px;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 5px;
    }

    .btn-primary {
        color: #fff;
        background-color: #3399FF;
    }

    .search-input {
        width: 500px;
        padding: 10px 5px;
    }

    .search-btn {
        height: 45px;
        border-radius: 2px;
        position: relative;
        top: -1px;
        left: -6px;
    }
</style>