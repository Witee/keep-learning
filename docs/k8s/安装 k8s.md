# 一个凑合能用的 k8s 集群是如何搭建起来的



## 什么是 Kubernetes(k8s)

一个管理容器的平台(理解).

	- 开源
	- 可扩展
	- 声明式配置
	- 自动化

读音: [kubə’netis]  库伯耐踢死

## 部署方式的变迁

	- 传统部署时代: 物理服务器上运行应用程序
	- 虚拟化部署时代: 实体机上启动虚拟机, 可伸缩, 降低硬件成本
	- 容器部署时代:  docker, k8s




## 服务器需求

- k8s-master
- k8s-node1
- k8s-node2 (凑合凑合一台node也能用)



## 安装软件

> 省略了些细节, 如配置防火墙等.
>
> 详情见官方文档: https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

#### 每台机器上需要安装如下软件:

- `kubeadm`:  用来初始化集群
- `kubelet`:  在集群中的每个节点上启动 Pod 和容器
- `kubectl`:  用来与集群通信的命令行工具

node 节点还需要安装运行时软件 docker

`kubeadm init` 前准备工作

```shell
#!/bin/bash
url=registry.cn-hangzhou.aliyuncs.com/google_containers
version=v1.20.2
images=(`kubeadm config images list --kubernetes-version=$version|awk -F '/' '{print $2}'`)
for imagename in ${images[@]} ; do
  echo $imagename
  docker pull $url/$imagename
  docker tag $url/$imagename k8s.gcr.io/$imagename
  docker rmi -f $url/$imagename
done
```

#### master 节点需要执行 `kubeadm init <...>` 来初始化成为主节点, 并会启动以下服务:

> 如: `kubeadm init --kubernetes-version=v1.20.2 --pod-network-cidr=10.244.0.0/16 --token-ttl=0`

	- kubelet
	- kube-proxy
	- kube-control
	- kube-scheduler
	- kube-apiserver



> 服务详细说明: https://kubernetes.io/zh/docs/concepts/overview/components/

master 安装网络组件(node 节点会自动安装):

`kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml`

将 node 节点加入集群: `kubeadmin join API_SERVER --token ...`

master 上查看已有的 node 节点: `kubectl get nodes`

```shell
[root@bj-office-bia2 ~]# kubectl get nodes
NAME             STATUS     ROLES                  AGE   VERSION
bj-office-bia2   Ready      control-plane,master   79m   v1.20.2
bjo-bia-92       NotReady   <none>                 31m   v1.20.2
bjo-bia-95       NotReady   <none>                 30m   v1.20.2
```

看到状态是`NotReady`, 可以通过 `kubectl describe node bjo-bia-92` 命令查看原因.

master 上还要确保服务正常运行, 可通过以下命令查看 `kubectl get pods --namespace=kube-system`

```shell
[root@bj-office-bia2 ~]# kubectl get pods --namespace=kube-system
NAME                                     READY   STATUS              RESTARTS   AGE
coredns-74ff55c5b-n6w2g                  1/1     Running             1          98m
coredns-74ff55c5b-ndxgs                  1/1     Running             1          98m
etcd-bj-office-bia2                      1/1     Running             1          98m
kube-apiserver-bj-office-bia2            1/1     Running             1          98m
kube-controller-manager-bj-office-bia2   1/1     Running             1          98m
kube-flannel-ds-7fltl                    0/1     Init:0/1            0          99s
kube-flannel-ds-9qn2t                    0/1     Init:0/1            0          106s
kube-flannel-ds-s4tcl                    1/1     Running             1          90m
kube-proxy-7vdzd                         0/1     ContainerCreating   0          114s
kube-proxy-hn88v                         1/1     Running             1          98m
kube-proxy-t7qfr                         0/1     ContainerCreating   0          2m9s
kube-scheduler-bj-office-bia2            1/1     Running             1          98m
```

正常情况下STATUS都是 Running, 删除有问题的服务, 会自动创建(相当于重启).

 `kubectl delete pod --namespace=kube-system kube-flannel-ds-wskpq`

本例中的情况是由于 node 节点 docker 没有 `pause:3.2` 和 `kube-proxy:v1.20.2` 镜像导致的失败.

手动下取镜像后:

```shell
[root@bj-office-bia2 ~]# kubectl get pods --namespace=kube-system
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-n6w2g                  1/1     Running   8          5h28m
coredns-74ff55c5b-ndxgs                  1/1     Running   8          5h28m
etcd-bj-office-bia2                      1/1     Running   8          5h28m
kube-apiserver-bj-office-bia2            1/1     Running   8          5h28m
kube-controller-manager-bj-office-bia2   1/1     Running   8          5h28m
kube-flannel-ds-2t5kn                    1/1     Running   0          3m21s
kube-flannel-ds-6wp4p                    1/1     Running   0          3m21s
kube-flannel-ds-lqm2j                    1/1     Running   0          3m21s
kube-proxy-8dr2p                         1/1     Running   0          10m
kube-proxy-fmwk7                         1/1     Running   2          45m
kube-proxy-kz62l                         1/1     Running   0          9m26s
kube-scheduler-bj-office-bia2            1/1     Running   9          5h28m
```



## 安装 dashboard

> 官网: https://github.com/kubernetes/dashboard

准备工作
```
#提前将镜像拉下来
docker pull kubernetesui/dashboard:v2.1.0
docker pull kubernetesui/metrics-scraper:v1.0.6
```

安装
```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.1.0/aio/deploy/recommended.yaml
```

启动

```shell
kubectl proxy --address=0.0.0.0 --accept-hosts='^*$'
```

访问

```shell
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
```

创建账号并分配权限

```shell
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
EOF

cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```

获取访问 token

```shell
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"

```

使用 token 登录 dashboard

## 运行你的程序

### 一些概念

- Pod: 
  - 是可以在 Kubernetes 中创建和管理的最小可部署的计算单元
  - 可以运行一个或多个容器, 每个 Pod 都有不同的ip, 同一个 Pod 中的容器共享存储,网络等
  - 临时的, 用完即丢弃, 通过 k8s 中的 controller 管理, 通过模板来创建, 如 Deployment, Job, Service 等
  - 最常见的情况是一个 Pod 中运行一个容器
- Service: 为一组 Pods 提供统一的入口, 由 LabelSelector 选定 Pod

### 创建 Service

假设有一组Pod, 对外暴露了80端口, 并有 app=web 标签

```shell
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: default
spec:
  selector:
    app: web
  type: NodePort
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30000
EOF
```

![image-20210219180326606](/Users/Witee/Library/Application Support/typora-user-images/image-20210219180326606.png)

创建完成后, 会在所有节点上启动一个端口为 30000 的服务

![image-20210219180618733](/Users/Witee/Library/Application Support/typora-user-images/image-20210219180618733.png)

通过名称删除

```shell
[root@bj-office-bia2 ~]# kubectl delete service my-service
service "my-service" deleted
```



### 创建 Pod

```shell
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
  namespace: default
  labels:
    app: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
        labels:
          app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
          - containerPort: 80
EOF
```

通过名称删除 

```shell
[root@bj-office-bia2 ~]# kubectl delete deployment web-deployment
deployment.apps "nginx-deployment" deleted
```

### 访问

[推荐]访问任意一个节点的 IP + nodePort

[不推荐]通过此服务集群IP + port 即可访问, 因为重建Service后IP就变了, 即 http://10.107.223.221:80

![image-20210219175426179](/Users/Witee/Library/Application Support/typora-user-images/image-20210219175426179.png)



## 解释

### 配置中端口的区别

- nodePort: 集群外部客户端访问 Service 的入口, 即 nodeIP: nodePort
- port: cluster ip 上的端口, :port 提供了集群内部访问 service 的入口
- targetPort: 指定是 pod 上的暴露端口, 需要与制作容器时暴露的端口一致(使用DockerFile中的EXPOSE)
- containerPort: 是在 pod 控制器中定义的需要暴露的端口, 与 targetPort 一致

### Pod 与 容器的关系

![image-20210223105808134](/Users/Witee/Library/Application Support/typora-user-images/image-20210223105808134.png)

### Node 与 Pod 的关系

![image-20210223105857385](/Users/Witee/Library/Application Support/typora-user-images/image-20210223105857385.png)

### 常用命令

- `kubectl get` 显示资源列表
```shell
[root@bj-office-bia2 ~]# kubectl get deployments  // 获取类型为 Deployment 的资源列表
NAME             READY   UP-TO-DATE   AVAILABLE   AGE
web-deployment   2/2     2            2           3d17h

[root@bj-office-bia2 ~]# kubectl get pods  // 获取类型为 Pod 的资源列表
NAME                             READY   STATUS    RESTARTS   AGE
web-deployment-f4fd8c4dc-bnsjl   1/1     Running   0          2d15h
web-deployment-f4fd8c4dc-kfsrj   1/1     Running   0          2d15h

[root@bj-office-bia2 ~]# kubectl get nodes  // 获取类型为 Node 的资源列表
NAME             STATUS   ROLES                  AGE     VERSION
bj-office-bia2   Ready    control-plane,master   5d      v1.20.2
bjo-bia-92       Ready    <none>                 4d23h   v1.20.2
bjo-bia-95       Ready    <none>                 4d23h   v1.20.2

[root@bj-office-bia2 ~]# kubectl get node --show-labels // 同时显示 Node 标签
NAME             STATUS   ROLES                  AGE   VERSION   LABELS
bj-office-bia2   Ready    control-plane,master   12d   v1.20.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=bj-office-bia2,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node-role.kubernetes.io/master=
bjo-bia-92       Ready    <none>                 11d   v1.20.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=bjo-bia-92,kubernetes.io/os=linux,zone=zone1
bjo-bia-95       Ready    <none>                 11d   v1.20.2   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=bjo-bia-95,kubernetes.io/os=linux,zone=zone1

[root@bj-office-bia2 ~]# kubectl label node bjo-bia-92 myLabel=myValue // 给 Node 设置自定义标签
...

[root@bj-office-bia2 ~]# kubectl get deployments -A  // 查看所有命名空间中的对象
NAMESPACE              NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
default                web-deployment              2/2     2            2           3d17h
kube-system            coredns                     2/2     2            2           5d
kubernetes-dashboard   dashboard-metrics-scraper   1/1     1            1           4d17h
kubernetes-dashboard   kubernetes-dashboard        1/1     1            1           4d17h

[root@bj-office-bia2 ~]# kubectl get deployments --all-namespaces  // 查看所有命名空间中的对象
NAMESPACE              NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
default                web-deployment              2/2     2            2           3d17h
kube-system            coredns                     2/2     2            2           5d
kubernetes-dashboard   dashboard-metrics-scraper   1/1     1            1           4d17h
kubernetes-dashboard   kubernetes-dashboard        1/1     1            1           4d17h

[root@bj-office-bia2 ~]# kubectl get deployments -n kube-system  // 查看命名空间为 kube-system 的 Deployment
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
coredns   2/2     2            2           5d

```

- `kubectl describe` 显示资源的详细信息
```shell

[root@bj-office-bia2 ~]# kubectl describe pod web-deployment-f4fd8c4dc-bnsjl
Name:         web-deployment-f4fd8c4dc-bnsjl
Namespace:    default
Priority:     0
Node:         bjo-bia-92/192.168.5.92
Start Time:   Sat, 20 Feb 2021 19:58:48 +0800
Labels:       app=web
              pod-template-hash=f4fd8c4dc
Annotations:  <none>
Status:       Running
IP:           10.244.1.10
IPs:
  IP:           10.244.1.10
Controlled By:  ReplicaSet/web-deployment-f4fd8c4dc
Containers:
  nginx:
    Container ID:   docker://d66413486f33d92f0028c2b4e73c14b3750f0bafe2a3e8bcc60376dac12916b8
    Image:          nginx:1.14.2
    Image ID:       docker-pullable://nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Sat, 20 Feb 2021 19:58:52 +0800
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-b6vwd (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-b6vwd:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-b6vwd
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:          <none>

[root@bj-office-bia2 ~]# kubectl describe deployment web-deployment
Name:                   web-deployment
Namespace:              default
CreationTimestamp:      Fri, 19 Feb 2021 17:46:37 +0800
Labels:                 app=web
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=web
Replicas:               2 desired | 2 updated | 2 total | 2 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=web
  Containers:
   nginx:
    Image:        nginx:1.14.2
    Port:         80/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Progressing    True    NewReplicaSetAvailable
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   web-deployment-f4fd8c4dc (2/2 replicas created)
Events:          <none>
```
-  `kubectl logs` 查看 Pod 中容器的打印日志(类似 docker logs)
```shell
[root@bj-office-bia2 ~]# kubectl logs web-deployment-f4fd8c4dc-bnsjl
[root@bj-office-bia2 ~]# kubectl logs -f web-deployment-f4fd8c4dc-bnsjl
^C

```
- `kubectl exec` 在 Pod 中的容器环境内执行命令(类似 docker exec)
```shell
[root@bj-office-bia2 ~]# kubectl exec -it web-deployment-f4fd8c4dc-bnsjl /bin/bash
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
root@web-deployment-f4fd8c4dc-bnsjl:/# exit
```



## 将 Pod 分配给 Node

### 通过默认规则调度,  即优先调度至低负载 Node 上

```shell
[root@bj-office-bia2 k8s]# cat test.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dep-test         # 自定义 Pod 名称, 同时名称后还会加上 Hash 值, 如 dep-test-59db488bf9-7b6d6
spec:
  selector:
    matchLabels:
      app: nginx         # 此处标签要在 template.metadata.labels 设置的标签中
      # user: frontend   # 可以写多个, 相互间是且的关系
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx        # 此处标签要包含 spec.selector.matchLabels 中设置的标签
        # user: frontend  # 可以写多个
    spec:
      containers:
        - name: nginx
          image: nginx:1.15.2
          ports:
            - containerPort: 80
```

### 通过 `nodeSelector` 指定 Node

`nodeSelector` 只能匹配Node上的标签

```shell
[root@bj-office-bia2 k8s]# cat test.yml
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
      nodeSelector:
        kubernetes.io/hostname: bjo-bia-92 # 使用 Node 主机名选择, 会将两个 Pod 都调度到 bjo-bia-92 上
        #zone: zone1  # 自定义标签调度
```

`nodeSelector` 可以写多个, 相互间是且的关系, 匹配到多台时根据负载调度.

### 通过亲和性调度指定 Node 列表上

>  理解: Node亲和性(nodeAffinity)  Pod亲和性(podAffinity) 和 Pod反亲和性(podAntiAffinity)

```shell
[root@bj-office-bia2 k8s]# cat test.yml
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
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/hostname
                operator: In
                values:
                - bjo-bia-92
                - bjo-bia-95
```

上面表达式的意义是, 可以将 Pod 分配到 bjo-bia-92 和 bjo-bia-95 上, 策略是根据负载情况分配, 即 如果 bjo-bia-92 比 bjo-bia-95 负载高, 则会将两个 Pod优先分配至 bjo-bia-95 上, 只有在负载相同的情况下才会平均分配.

### 如何让 pod 平均分布在不同 node 上

默认策略是在负载低的 node 上,  可以通过设置 pod 反亲和性(`PodAntiAffinity`)实现运行在不同 pod 的效果:

```shell
[root@bj-office-bia2 k8s]# cat test.yml
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
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
              matchExpressions:
               - key: app
                 operator: In
                   values:
                     - nginx
              topologyKey: "kubernetes.io/hostname"
```

原理:

`PodAffinity` 与 `PodAntiAffinity`

在 Kubernetes 中，与“亲和性”相关的指令控制 Pod 的调度方式（更密集或更分散）

- 对于 `PodAffinity`，你可以尝试将任意数量的 Pod 集中到符合条件的拓扑域中
- 对于 `PodAntiAffinity`，只能将一个 Pod 调度到某个拓扑域中

`topologyKey: "kubernetes.io/hostname"` 意义为相同主机名会被设置为同一个拓扑域中, 由于没有相同的主机名, 所以实现了在不同 node 上运行 pod 的效果.





### 补充: `kubectl create | apply | replace` 区别

```shell
[root@bj-office-bia2 k8s]# kubectl apply -f test.yml
deployment.apps/dep-test configured
[root@bj-office-bia2 k8s]# kubectl create -f test.yml
Error from server (AlreadyExists): error when creating "test.yml": deployments.apps "dep-test" already exists
[root@bj-office-bia2 k8s]# kubectl replace -f test.yml
deployment.apps/dep-test replaced
[root@bj-office-bia2 k8s]# kubectl replace -f test.yml
deployment.apps/dep-test replaced
[root@bj-office-bia2 k8s]# kubectl apply -f test.yml
Warning: resource deployments/dep-test is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
deployment.apps/dep-test configured
[root@bj-office-bia2 k8s]# kubectl apply -f test.yml
deployment.apps/dep-test unchanged
```

第一次执行时 create 与 apply 没有区别, replace 会报错.

> 如果用 create 创建 pod 再使用 apply 修改时会有警告, 因为 apply 会写注释(annotation)用来对比更新, 所以不要混用.

再次执行时, create 会报错, apply 正常执行并不产生影响, replace 正常执行并不产生影响, 但如果 replace 加上参数 `--force` 则会重新创建 pod.

总结: `create` 用于创建新资源; `apply` 尝试在当前资源中修改, 用于应用资源(创建,修改等);  replace (有变化时)先删除资源, 再重新创建

### Pod yml 配置文件参考

```yml
apiVersion: v1    　　　　　　# 必选，版本号
kind: Pod         　　　　　　# 必选，Pod
metadata:         　　　　　　# 必选，元数据
  name: String    　　　　　　# 必选，Pod名称
  namespace: String    　　　# 必选，Pod所属的命名空间
  labels:            　　　　# 自定义标签，Map格式
    Key: Value    　　　　　　# 键值对
  annotations:    　　　　　　# 自定义注解
    Key: Value    　　　　　  # 键值对
spec:            　　　　　　 # 必选，Pod中容器的详细属性
  containers:        　　　　 # 必选，Pod中容器列表
  - name: String   　　　　   # 必选，容器名称
    image: String    　　　　 # 必选，容器的镜像地址和名称
    imagePullPolicy: {Always | Never | IfNotPresent}   
 　　　　                     # 获取镜像的策略，Always表示下载镜像，IfnotPresent 表示优先使用本地镜像，否则下载镜像，Never表示仅使用本地镜像。
    command: [String]         # 容器的启动命令列表(覆盖)，如不指定，使用打包镜像时的启动命令。
    args: [String]            # 容器的启动命令参数列表
    workingDir: String        # 容器的工作目录
    volumeMounts:             # 挂载到容器内部的存储卷配置
    - name: String            # 引用Pod定义的共享存储卷的名，需用Pod.spec.volumes[]部分定义的卷名
      mountPath: String       # 存储卷在容器内Mount的绝对路径，应少于512字符
      readOnly: boolean       # 是否为只读模式
  ports:                      # 容器需要暴露的端口库号列表
  - name: String              # 端口号名称
    containerPort: Int        # 容器需要监听的端口号
    hostPort: Int             # 可选，容器所在主机需要监听的端口号，默认与Container相同
  env:                        # 容器运行前需设置的环境变量列表
  - name: String              # 环境变量名称
    value: String             # 环境变量的值
  resources:                  # 资源限制和请求的设置
    limits:                   # 资源限制的设置
      cpu: String             # Cpu的限制，单位为Core数，将用于docker run --cpu-shares参数，如果整数后跟m，表示占用权重，1Core=1000m
      memory: String          # 内存限制，单位可以为Mib/Gib，将用于docker run --memory参数
    requests:                 # 资源请求的设置
      cpu: string             # CPU请求，容器启动的初始可用数量
      memory: string          # 内存请求，容器启动的初始可用数量
  livenessProbe:   
 　　　　           # 对Pod内容器健康检查设置，当探测无响应几次后将自动重启该容器，检查方法有exec、httpGet和tcpSocket，对一个容器只需设置其中一种方法即可。
    exec:                     # 对Pod容器内检查方式设置为exec方式
      command: [String]       # exec方式需要制定的命令或脚本
    httpGet:                  # 对Pod容器内检查方式设置为HttpGet方式，需要指定path、port
      path: String            # 网址URL路径（去除对应的域名或IP地址的部分）
      port: Int               # 对应端口
      host: String            # 域名或IP地址
      schema: String          # 对应的检测协议，如http
      HttpHeaders:            # 指定报文头部信息
      - name: String
        value: String
    tcpSocket:                # 对Pod容器内检查方式设置为tcpSocket方式
      port: Int
    initialDelaySeconds: Int  # 容器启动完成后首次探测的时间，单位为秒
    timeoutSeconds: Int       # 对容器健康检查探测等待响应的超时时间，单位为秒，默认为1秒
    periodSeconds: Int        # 对容器监控检查的定期探测时间设置，单位为秒，默认10秒一次
    successThreshold: Int     # 探测几次成功后认为成功
    failureThreshold: Int     # 探测几次失败后认为失败
    securityContext:
      privileged: false
  restartPolicy: {Always | Never | OnFailure} 
 　　　　           # Pod的重启策略，Always表示一旦不管以何种方式终止运行，kubelet都将重启，OnFailure表示只有Pod以非0退出码才重启，Nerver表示不再重启该Pod
  nodeSelector:              # 设置NodeSelector表示将该Pod调度到包含这个label的node上，以Key:Value的格式指定
    Key: Value               # 调度到指定的标签Node上
  imagePullSecrets:          # Pull镜像时使用的secret名称，以Key:SecretKey格式指定
  - name: String
  hostNetwork: false         # 是否使用主机网络模式，默认为false，如果设置为true，表示使用宿主机网络
  volumes:                   # 在该Pod上定义共享存储卷列表
  - name: String             # 共享存储卷名称（Volumes类型有多种）
    emptyDir: { }            # 类型为emptyDir的存储卷，与Pod同生命周期的一个临时目录，为空值
    hostPath: String         # 类型为hostPath的存储卷，表示挂载Pod所在宿主机的目录
    path: String             # Pod所在宿主机的目录，将被用于同期中Mount的目录
  secret:                    # 类型为Secret的存储卷，挂载集群与定义的Secret对象到容器内部
    secretname: String
    items:                   # 当仅需挂载一个Secret对象中的指定Key时使用
    - key: String
     path: String
  configMap:                 # 类型为ConfigMap的存储卷，挂载预定义的ConfigMap对象到容器内部
    name: String
    items:                   # 当仅需挂载一个ConfigMap对象中的指定Key时使用
    - key: String
      path: String
```

