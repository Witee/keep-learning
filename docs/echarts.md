# Echarts(4.x) + typescript + react hooks



使用 react hooks 封装 echarts

```react
import React, { useRef, useEffect } from 'react';
import echarts, { EChartOption } from 'echarts';

export interface GraphProps {
  option: EChartOption;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  silent?: boolean;
  showLoading?: boolean;
  onClick?: any;
}

export function Graph(props: GraphProps) {
  const { option, notMerge, lazyUpdate, silent, showLoading, onClick } = props;

  const ref = useRef<HTMLDivElement>(null);
  const chart: any = useRef(null);

  // lazyUpdate 为 true 时, 在控制台可能会有报错: 
  // Cannot read property 'getRawIndex' of undefined https://github.com/apache/incubator-echarts/issues/9402
  // 解决办法是在从远程获取数据时显示 loading, 所以需要设置 showLoading
  useEffect(() => {
    if (chart.current && typeof showLoading !== 'undefined') {
      if (showLoading) {
        chart.current.showLoading();
      } else {
        chart.current.hideLoading();
      }
    }
  }, [showLoading]);

  // 更新配置
  useEffect(() => {
    if (chart.current) {
      chart.current.setOption(option, notMerge, lazyUpdate, silent);
    }
  }, [lazyUpdate, notMerge, option, silent]);

  // 初始化并绑定 click 事件
  useEffect(() => {
    if (!chart.current) {
      const { current: node } = ref;
      if (node) {
        chart.current = echarts.init(node, 'light');

        chart.current.on('click', onClick);
      }
    }
  }, [onClick]);

  return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
}

```

