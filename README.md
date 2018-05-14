docLever-node-plugin
===============

nodejs plugin for docLever

## 安装

`npm install doclever-node-plugin-xin --save`

## 使用

```js
let doclevernode = require('doclever-node-plugin-xin');

doclevernode.queryDocLeverModel({
        host: 'apidev.xin.com', // 主机域名，默认请参见config
        port: '', // 端口，默认请参见config
        projectId: ObjectId(id), // 项目ID，默认请参见config
    }, function() {
        return {a: 1, b: 2}
    }
});
```

该接口以分组的形式返回该项目的接口数据，具体形式如下

```js
{ 
    data: [
        {
            _id: "5acb085a597a3880e805b76c", // 组ID
            group_name: ["车型车系"], // 组名
            param: [ // 该组下的所有接口
                {
                    id: "7d6f2b30-3bbf-11e8-804a-f56ffc07bfc8", // 接口id
                    name: "车系列表", // 接口名称
                    url: "/series", // 接口路径
                    remark: "获取车系列表数据", // 接口描述
                    resultType: 0, // 取值0 || 1, 0 表示这个几口最终数据是json，1表示该接口返回array数据
                    outParam: [ // 接口返回的mock 数据详情, 这里数据存储的时候被转化为mongo数据的形式了
                        {
                            name: 'msg',
                            type: 0,
                            remark: '',
                            must: 1,
                            mock: '成功'
                        },
                        {
                            name: 'status', 
                            type: 2,
                            remark: '',
                            must: 1,
                            mock: true
                        },
                        {
                            name: 'code',
                            type: 1,
                            remark: '',
                            must: 1,
                            mock: 200
                        },
                        {
                            name: 'data',
                            type: 4,
                            remark: '',
                            mock: '',
                            data: [

                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

### 接口详情数据被转化后的类型对应

```js
    /*
    **  数据类型
        0: value, // string
        1: value, // number
        2: value, // boolean
        3: value.data, // object item in an array
        4: value.data, // an object
        5: null || undefined
    */
```

## API

### queryDocLeverModel(callback)

- `callback` `必传` 获取数据成功之后的回调函数
- 函数内定义了变量host, port, projectId 均来源于config 的配置



### config(options)

可以通过 `doclevernode.config(options)` 配置设置，目前的配置项如下：

    - `host` doclever xin 的服务主机
    - `port` 服务端口号（默认是 80）
    - `projectId` 项目ID
    - `wrapper` 返回数据的包装属性名，用于在php或vm中指定根属性名，默认为 `空`，如果设置为`空字符串` 或 `false`，则不包装

#### 配置示例

```js
var doclevernode = require('doclever-node-plugin-xin');

doclevernode.config({
    host: '',    //启动的服务主机
    port: '',           //端口号
    projectId: '5ab3213b5d30311201b752bc',  //项目ID
    wrapper: ''             //不需要包装
})
```

## 说明

- 接口返回的数据可以直接通过 http://apidev.xin.com/xinmock/data?project=projectId 来查看
- 具体的返回格式不用太关注，因为这个数据最终会转化为我们填写接口数据时传入的json 或者 array 形式的数据