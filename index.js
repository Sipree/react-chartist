'use strict';

import React from 'react';

class ChartistGraph extends React.Component {

  displayName: 'ChartistGraph'

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  updateChart(config) {
    let Chartist = require('chartist');

    let { type, data } = config;
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

    if (this.chartist) {
      this.chartist.update(data, options, responsiveOptions);
    } else {
      this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions);

      if (config.listener) {
        for (event in config.listener) {
          if (config.listener.hasOwnProperty(event)) {
            this.chartist.on(event, config.listener[event]);
          }
        }
      }

    }

    return this.chartist;
  }

  render() {
    var div_options = { className: 'ct-chart' };

    if(this.props.hasOwnProperty("id")) {
      div_options.id = this.props.id;
    }
    return React.DOM.div(div_options);
  }

}

ChartistGraph.propTypes = {
  type: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array
}

export default ChartistGraph;
