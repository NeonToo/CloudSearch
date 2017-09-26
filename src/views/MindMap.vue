<template>
    <div class="ui container">
        <div class="ui segment">
            <div id="graph">
                <!--<svg id="svg" :width="730" :height="540">-->
                <!--<g></g>-->
                <!--</svg>-->
            </div>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        data() {
            return {
                margin: {
                    top: 20,
                    right: 80,
                    bottom: 20,
                    left: 80
                },
                width: 600,
                height: 500,
                root: null,
                svg: null,
                tree: null,
                diagonal: null
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.svg = d3.select("#graph")
                    .append("svg")
                    .attr("width", this.width + this.margin.right + this.margin.left)
                    .attr("height", this.height + this.margin.top + this.margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
//                this.svg = d3.select("#svg");
                // 树状图布局
                this.tree = d3.layout.tree().size([this.height, this.width]);
                // 对角线生成器
                this.diagonal = d3.svg.diagonal().projection(function (d) {
                    return [d.y, d.x];
                });
                this.root = {
                    "name": "如何学习D3",
                    "children": [
                        {
                            "name": "预备知识",
                            "children": [
                                {
                                    "name": "HTML & CSS"
                                },
                                {
                                    "name": "JavaScript"
                                },
                                {
                                    "name": "DOM"
                                },
                                {
                                    "name": "SVG"
                                }
                            ]
                        },
                        {
                            "name": "安装",
                            "children": [
                                {
                                    "name": "记事本软件",
                                    "children": [
                                        {
                                            "name": "Notepad++"
                                        },
                                        {
                                            "name": "EditPlus"
                                        },
                                        {
                                            "name": "Sublime Text"
                                        }
                                    ]
                                },
                                {
                                    "name": "服务器软件",
                                    "children": [
                                        {
                                            "name": "Apache Http Server"
                                        },
                                        {
                                            "name": "Tomcat"
                                        }
                                    ]
                                },
                                {
                                    "name": "下载D3.js"
                                }
                            ]
                        },
                        {
                            "name": "入门",
                            "children": [
                                {
                                    "name": "选择集",
                                    "children": [
                                        {
                                            "name": "select"
                                        },
                                        {
                                            "name": "selectAll"
                                        }
                                    ]
                                },
                                {
                                    "name": "绑定数据",
                                    "children": [
                                        {
                                            "name": "datum"
                                        },
                                        {
                                            "name": "data"
                                        }
                                    ]
                                },
                                {
                                    "name": "添加删除元素"
                                },
                                {
                                    "name": "简单图形",
                                    "children": [
                                        {
                                            "name": "柱形图"
                                        },
                                        {
                                            "name": "折线图"
                                        },
                                        {
                                            "name": "散点图"
                                        }
                                    ]
                                },
                                {
                                    "name": "比例尺"
                                },
                                {
                                    "name": "生成器"
                                },
                                {
                                    "name": "过渡"
                                }
                            ]
                        },
                        {
                            "name": "进阶",
                            "children": [
                                {
                                    "name": "布局的应用",
                                    "children": [
                                        {
                                            "name": "饼状图"
                                        },
                                        {
                                            "name": "树状图"
                                        },
                                        {
                                            "name": "矩阵树图"
                                        }
                                    ]
                                },
                                {
                                    "name": "地图"
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
                    })
                    .on("click", function (d) {
                        that.toggle(d);
                        that.redraw(d);
                    });
                enterNodes.append("circle")
                    .attr("r", 0)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
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
                    .style("fill-opacity", 0);
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
    .node circle {
        cursor: pointer;
        fill: #fff;
        stroke: steelblue;
        stroke-width: 2px;
    }
    .node text {
        font-size: 12px;
    }
    .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 1.5px;
    }
</style>