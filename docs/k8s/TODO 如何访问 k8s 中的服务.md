# 如何访问 k8s 中的服务

## 背景

将以下应用布署后可以通过 pod IP:containerPort 访问服务

 `kubectl apply -f test.yml` 

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dep-test
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.15.2
          ports:
            - containerPort: 80
```

但重新部署后IP会变化.

服务在 k8s 中运行后, 外部是没有办法直接访问的, 需要通过 Service 进行访问.



## Service 的几种类型

>  定义: 将运行在一组 Pod 上的应用程序公开为网络服务的抽象方法。


- ClusterIP (默认): 通过集群的内部 IP 暴露服务，选择该值时服务只能够在集群内部访问。
- NodePort: 通过每个节点上的 IP 和静态端口（`NodePort`）暴露服务。
- LoadBalancer: 使用云提供商的负载均衡器向外部暴露服务。 外部负载均衡器可以将流量路由到自动创建的 `NodePort` 服务和 `ClusterIP` 服务上。
- ExternalName: 通过返回 `CNAME` 和对应值，可以将服务映射到 `externalName` 字段的内容（例如，`foo.bar.example.com`）。 无需创建任何类型代理。

小规模集群情况, 用的最多的是 NodePort 类型.

由 Service 配置文件中 `spec.type` 指定

```yml
apiVersion: v1
kind: Service
metadata:
  name: my-app
  namespace: default
spec:
  selector:
    app: nginx            # 与 Pod 中设置的一致
  type: NodePort
  ports:
    - protocol: TCP
      port: 80            # 集群内部访问的端口
      targetPort: 80      # Pod 暴露的端口, 对应创建 Pod 时的 containerPort 配置
      nodePort: 30000     # 对外暴露的 Service 端口
```

创建完成后, 会在所有节点上启动一个端口为 30000 的服务.

![image-20210219180618733](/Users/Witee/Library/Application Support/typora-user-images/image-20210219180618733.png)

通过任意一个节点的 IP + nodePort 访问.



## 大规模集群的情况



### Ingress 是什么

Ingress 公开了从集群外部到集群内服务的 HTTP 和 HTTPS 路由。 流量路由由 Ingress 资源上定义的规则控制。

使用 Ingress 暴露服务. Ingress 并不是 Service 的一种类型, 但可以做为集群的入口点.

下面是一个将所有流量都发送到同一 Service 的简单 Ingress 示例：

![image-20210302154036306](/Users/Witee/Library/Application Support/typora-user-images/image-20210302154036306.png)