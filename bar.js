function clickedSubmit() {

  var races = ["w", "b", "l", "a", "m", "n"];
  var initialPop = [195664841, 38750185, 47435002, 15489181, 3437512, 3075398];
  var arr = [1, 1, 1, 1, 1, 1];
  var numYears = parseInt(document.getElementById("years").value);
  //alert(numYears);
  for (i = 0; i < 6; i++) {
    var r = races[i];
    mRate = parseFloat(document.getElementById(r + "-migration").value);
    bRate = parseFloat(document.getElementById(r + "-birth").value);
    dRate = parseFloat(document.getElementById(r + "-death").value);
    arr[i] = calcResult(numYears, initialPop[i], mRate, bRate, dRate);
  }
  showBar(arr, numYears);
  total = arr.reduce(getSum);
  showPie(arr, numYears, total);
}

function calcResult(numYears, iPop, mRate, bRate, dRate) {
  var result = iPop;

  for (var i = 1; i < numYears + 1; i++) {
    //CHANGE GROWTH RATE HERE
    result += ((Math.random() / 500 + 0.999) ** i * mRate + bRate - dRate) * result;
  }
  return result;
}

function getSum(total, num) {
    return total + num;
}

function showBar(arr, numYears, total) {
  var chart = new CanvasJS.Chart("barchart", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text:"Population in " + numYears + " year(s)"
    },
    axisY:{
      //interval: 1
      //title: x
    },
    data: [{
      type: "column",
      color: "#014D65",
      dataPoints: [
        { y: arr[0], label: "White" },
        { y: arr[1], label: "Black" },
        { y: arr[2], label: "Latinx" },
        { y: arr[3], label: "Asian" },
        { y: arr[4], label: "Middle Eastern" },
        { y: arr[5], label: "Native American" }
      ]
    }]
  });
  chart.render();
}

function showPie(arr, numYears, total) {
  var chart = new CanvasJS.Chart("piechart", {
  	animationEnabled: true,
  	title: {
  		text: "US Demographic Breakdown in " + numYears + " year(s)"
  	},
  	data: [{
  		type: "pie",
  		yValueFormatString: "##0.00\"%\"",
  		indexLabel: "{label} {y}",
  		dataPoints: [
        { y: arr[0] / total * 100, label: "White" },
        { y: arr[1] / total * 100, label: "Black" },
        { y: arr[2] / total * 100, label: "Latinx" },
        { y: arr[3] / total * 100, label: "Asian" },
        { y: arr[4] / total * 100, label: "Middle Eastern" },
        { y: arr[5] / total * 100, label: "Native American" }
  		]
  	}]
  });
  chart.render();
}
