import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react';
import './style.css';
import { Chart } from 'open-combine-design';
import Container from './Container';

class App extends Component {
  state = {

  }


  render() {
    const dataSource = [
      ['日期', '平台', '声量'],
      ['2018-07-20', '微博', 52872],
      ['2018-07-20', '微信', 8510],
      ['2018-07-21', '微博', 47381],
      ['2018-07-21', '微信', 8195],
      ['2018-07-22', '微博', 37072],
      ['2018-07-22', '微信', 6925],
      ['2018-07-23', '微博', 44665],
      ['2018-07-23', '微信', 7934],
      ['2018-07-24', '微博', 46858],
      ['2018-07-24', '微信', 8889],
      ['2018-07-25', '微博', 30272],
      ['2018-07-25', '微信', 3925],
    ];
    return (
      <div>
        <div className="description">
          可移动的 echarts
        </div>

        <div className="echarts-article-content">
          <Container>
            {/* <ReactEcharts
              option={{
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                  type: 'value',
                },
                series: [{
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: 'bar',
                }],
              }}
            /> */}

            <Chart.EchartsEditor
              dataSource={dataSource}
              style={{ width: '100%' }}
              editable={false}
              // title={'Title'}
              // subtitle={'subtitle'}
              // titlePosition={titlePosition}
              // legendPosition={legendPosition}
              // xAxisLabel={xAxisLabel}
              // xAxisName={xAxisName}
              // yAxisLabel={yAxisLabel}
              // yAxisName={yAxisName}
              // numbericAxis={numbericAxis}
              // seriesColumn={seriesColumn}
              // seriesConf={seriesConf}
              // filters={filters}
              // sorter={sorter}
              // dateRange={dateRange}
              // lastNDays={lastNDays}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
