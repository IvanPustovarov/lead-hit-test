<template>
  <h1 class="analitics">Аналитика</h1>
  <h2 class="analitics">Аналитика по визитам</h2>
  <div class="graphic" ref="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
export default {
  name: "AnaliticsView",
  components: {},
  methods: {},
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;
    const data = this.$store.state.data;

    let newData = data.map((elem) => {
      elem.date = new Date(elem.date);
      return elem;
    });

    chart.data = newData;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.max = 350;
    yAxis.strictMinMax = true;
    yAxis.baseValue = -1000;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.fillOpacity = 0.3;

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
.graphic {
  width: 100%;
  height: 500px;
}

.analitics {
  margin: 10px 0 0 10px;
}
</style>
