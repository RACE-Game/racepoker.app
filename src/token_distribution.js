(function(){
  let element;
  let windowHeight;
  let chart;

  function init() {
    element = document.getElementById('token-distribution');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    if (!chart) {
      let positionFromTop = element.getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= -200) {
        chart = new Chart(document.getElementById("token-distribution"), chartConfig)
      }
    }
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const labels = [
    'LP',
    'Early Access',
    'Private',
    'Team',
    'Reserve',
    'Bridge',
    'Community',
  ];

  const colors = [
    ["#f2db46", "#ddd49b"],
    ["#b1dd42", "#cadd9b"],
    ["#3cd86b", "#9bddaf"],
    ["#3ed8d1", "#9bddda"],
    ["#3d77e2", "#9bb2dd"],
    ["#7539e5", "#b29bdd"],
    ["#e539c0", "#dd9bcf"],
  ];

  const data = {
    labels: labels,
    datasets: [{
      data: [4, 3, 5, 8, 10, 25, 45],
    }]
  };

  function getBgColor(params) {
    return colors[params.dataIndex][params.active ? 0 : 1];
  }

  let chartConfig = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: isMobile() ? 'bottom': 'right',
          fullSize: true,
          labels: {
            font: {
              size: 16,
            },
            color: '#EAEAEA',
            padding: 32,
            filter: (legendItem, data) => {
              // First, retrieve the data corresponding to that label
              const label = legendItem.text
              const labelIndex = data.labels.findIndex(labelName => labelName === label)
              const qtd = data.datasets[0].data[labelIndex]

              // Second, mutate the legendItem to include the new text
              legendItem.text = `${legendItem.text} ( ${qtd}% )`

              // Third, the filter method expects a bool, so return true to show the modified legendItem in the legend
              return true
            }
          },
        },
      },
      cutout: '30%',
      borderColor: '#171717',
      elements: {
        arc: {
          backgroundColor: getBgColor,
          hoverBackgroundColor: getBgColor,
        }
      }
    }
  };

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();
