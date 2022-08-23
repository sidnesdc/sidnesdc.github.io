// Add your javascript here

// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
    AOS.init({
        // uncomment below for on-scroll animations to played only once
        // once: true  
    }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

// chartjs

// page 2
var yearP2P3 = [];
var investmentGoal = [];
var investmentActual = [];
var asset = [];
var liability = [];
var netProfit = [];
var rnd = [];
var staffFee = [];
var toState = [];
var longTermDebt = [];
var staffNum = [];

// page 3
var effSpending = [];
var effInvestment = [];
var ebitdaPerStaff = [];
var expensePerStaff = [];
var roa = [];
var roe = [];

// page 4
var year = [];
var expense = [];
var income = [];
var org = [];
var showYear = [];
var showExpense = [];
var showIncome = [];
var selectedItem = '';
var selectedItemArray;
var selectedOrg = '';

// var netProfitxx = ['97438.39844', '134942.0804', '94131.46081', '77141.84067', '50560.72394', '62193.83989', '65171.3977', '70968.03304', '83993.82411', '93203.46656']
// var yearxx = ['2559', '2560', '2561', '2562', '2563', '2564*', '2565*', '2566*', '2567*', '2568*']

function updateChart(chart) {
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


// load csv to array page 2-3

d3.csv('../dataP2andP3.csv')
    .then(makeData)
    .catch(function(error) {
        throw (error);
    })

function makeData(data) {
    for (let i = 0; i < data.length; i++) {
        yearP2P3[i] = data[i].Year
        investmentGoal[i] = data[i].investmentGoal
        investmentActual[i] = data[i].investmentActual
        asset[i] = data[i].asset
        liability[i] = data[i].liability
        netProfit[i] = data[i].netProfit
        rnd[i] = data[i].rnd
        staffFee[i] = data[i].staffFee
        toState[i] = data[i].toState
        longTermDebt[i] = data[i].longTermDebt
        staffNum[i] = data[i].staffNum
        effSpending[i] = data[i].effSpending
        effInvestment[i] = data[i].effInvestment
        ebitdaPerStaff[i] = data[i].ebitdaPerStaff
        expensePerStaff[i] = data[i].expensePerStaff
        roa[i] = data[i].roa
        roe[i] = data[i].roe
    }


    // chart2_1 combo line / bar

    var data2_1 = {
        labels: yearP2P3,
        datasets: [{
            type: 'bar',
            label: 'เบิกจ่ายจริง',
            data: investmentActual,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(249, 102, 94, 0.7)'
        }, {
            type: 'line',
            label: 'เป้าหมาย',
            data: investmentGoal,
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
        }]
    };
    var config2_1 = {
        type: 'anything',
        data: data2_1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                        }
                    }

                }
            }
        }
    };

    var myChart2_1 = new Chart(
        document.getElementById('myChart2_1').getContext('2d'),
        config2_1
    );

    // chart2_2 bar

    var data2_2 = {
        labels: yearP2P3,
        datasets: [{
            label: 'สินทรัพย์',
            data: asset,
            borderColor: 'rgb(121, 159, 203)',
            backgroundColor: 'rgba(121, 159, 203)'
        }, {
            label: 'หนี้สิน',
            data: liability,
            fill: false,
            borderColor: 'rgb(249, 102, 94)',
            backgroundColor: 'rgb(249, 102, 94)'
        }]
    };
    var config2_2 = {
        type: 'bar',
        data: data2_2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                        }
                    }

                }
            }
        }
    };

    var myChart2_2 = new Chart(
        document.getElementById('myChart2_2').getContext('2d'),
        config2_2
    );


    // chart2_3 line ผลประกอบการ
    var data2_3 = {
        labels: yearP2P3,
        datasets: [{
            label: 'กำไรสุทธิ',
            backgroundColor: 'rgb(121, 159, 203)',
            borderColor: 'rgb(121, 159, 203)',
            fill: true,
            data: netProfit,
        }]
    };

    var config2_3 = {
        type: 'bar',
        data: data2_3,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: true,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                        }
                    }

                }
            }
        }
    };

    var myChart2_3 = new Chart(
        document.getElementById('myChart2_3').getContext('2d'),
        config2_3
    );

    // chart2_4 line เงินนำส่งรัฐ

    var data2_4 = {
        labels: yearP2P3,
        datasets: [{
            label: 'เงินนำส่งรัฐ',
            backgroundColor: 'rgb(121, 159, 203)',
            borderColor: 'rgb(121, 159, 203)',
            fill: true,
            data: toState,
        }]
    };

    var config2_4 = {
        type: 'bar',
        data: data2_4,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: true,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                        }
                    }

                }
            }
        }
    };

    var myChart2_4 = new Chart(
        document.getElementById('myChart2_4').getContext('2d'),
        config2_4
    );

    // chart2_5 line หนี้สินระยะยาว

    var data2_5 = {
        labels: yearP2P3,
        datasets: [{
            label: 'หนี้สินระยะยาว',
            backgroundColor: 'rgb(249, 102, 94)',
            borderColor: 'rgb(249, 102, 94)',
            fill: true,
            data: longTermDebt,
        }]
    };

    var config2_5 = {
        type: 'bar',
        data: data2_5,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: true,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                        }
                    }

                }
            }
        }
    };

    var myChart2_5 = new Chart(
        document.getElementById('myChart2_5').getContext('2d'),
        config2_5
    );

    // chart2_6 line จำนวนพนักงาน

    var data2_6 = {
        labels: yearP2P3,
        datasets: [{
            label: 'จำนวนพนักงาน',
            backgroundColor: 'rgb(121, 159, 203, 0.5)',
            borderColor: 'rgb(121, 159, 203)',
            fill: true,
            data: staffNum,
        }]
    };

    var config2_6 = {
        type: 'line',
        data: data2_6,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' คน';
                        }
                    }

                }
            }
        }
    };

    var myChart2_6 = new Chart(
        document.getElementById('myChart2_6').getContext('2d'),
        config2_6
    );

    // chart 3_1 line ประสิทธิภาพการจ่ายลงทุน

    var data3_1 = {
        labels: yearP2P3,
        datasets: [{
            label: 'ประสิทธิภาพการจ่ายลงทุน',
            backgroundColor: 'rgb(146, 203, 135, 0.5)',
            borderColor: 'rgb(146, 203, 135)',
            fill: true,
            data: effSpending,
        }]
    };

    var config3_1 = {
        type: 'line',
        data: data3_1,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' %';
                        }
                    }

                }
            }
        }
    };

    var myChart3_1 = new Chart(
        document.getElementById('myChart3_1').getContext('2d'),
        config3_1
    );

    // chart 3_2 line ประสิทธิภาพการดำเนินการลงทุน

    var data3_2 = {
        labels: yearP2P3,
        datasets: [{
            label: 'ประสิทธิภาพการดำเนินการลงทุน',
            backgroundColor: 'rgb(146, 203, 135, 0.5)',
            borderColor: 'rgb(146, 203, 135)',
            fill: true,
            data: effInvestment,
        }]
    };

    var config3_2 = {
        type: 'line',
        data: data3_2,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' %';
                        }
                    }

                }
            }
        }
    };

    var myChart3_2 = new Chart(
        document.getElementById('myChart3_2').getContext('2d'),
        config3_2
    );

    // chart 3_3 line EBITDA/พนักงาน 1 คน

    var data3_3 = {
        labels: yearP2P3,
        datasets: [{
            label: 'EBITDA/พนักงาน 1 คน',
            backgroundColor: 'rgb(146, 203, 135, 0.5)',
            borderColor: 'rgb(146, 203, 135)',
            fill: true,
            data: ebitdaPerStaff,
        }]
    };

    var config3_3 = {
        type: 'line',
        data: data3_3,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' = ' + context.parsed.y.toLocaleString() + ' ล้านบาทต่อคน';
                        }
                    }

                }
            }
        }
    };

    var myChart3_3 = new Chart(
        document.getElementById('myChart3_3').getContext('2d'),
        config3_3
    );

    // chart 3_4 line ค่าใช้จ่ายบุคลากร/พนักงาน 1 คน

    var data3_4 = {
        labels: yearP2P3,
        datasets: [{
            label: 'ค่าใช้จ่ายบุคลากร/พนักงาน 1 คน',
            backgroundColor: 'rgb(249, 102, 94, 0.5)',
            borderColor: 'rgb(249, 102, 94)',
            fill: true,
            data: expensePerStaff,
        }]
    };

    var config3_4 = {
        type: 'line',
        data: data3_4,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' = ' + context.parsed.y.toLocaleString() + ' ล้านบาทต่อคน';
                        }
                    }

                }
            }
        }
    };

    var myChart3_4 = new Chart(
        document.getElementById('myChart3_4').getContext('2d'),
        config3_4
    );

    // chart 3_5 line กำไรสุทธิจากการดำเนินงาน (EBIT)/สินทรัพย์ (ROA)
    var data3_5 = {
        labels: yearP2P3,
        datasets: [{
            label: 'ROA',
            backgroundColor: 'rgb(146, 203, 135, 0.5)',
            borderColor: 'rgb(146, 203, 135)',
            fill: true,
            data: roa,
        }]
    };

    var config3_5 = {
        type: 'line',
        data: data3_5,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' %';
                        }
                    }

                }
            }
        }
    };

    var myChart3_5 = new Chart(
        document.getElementById('myChart3_5').getContext('2d'),
        config3_5
    );

    // chart 3_6 line กำไรสุทธิ/ส่วนทุน (ROE)

    var data3_6 = {
        labels: yearP2P3,
        datasets: [{
            label: 'ROE',
            backgroundColor: 'rgb(146, 203, 135, 0.5)',
            borderColor: 'rgb(146, 203, 135)',
            fill: true,
            data: roe,
        }]
    };

    var config3_6 = {
        type: 'line',
        data: data3_6,
        options: {
            scales: {
                x: {},
                y: {
                    beginAtZero: false,
                }
            },
            animation: {},
            plugins: {
                legend: {},
                title: {},
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' %';
                        }
                    }

                }
            }
        }
    };

    var myChart3_6 = new Chart(
        document.getElementById('myChart3_6').getContext('2d'),
        config3_6
    );




}

// page 4

d3.csv('../dcapTest.csv')
    .then(makeData2)
    .catch(function(error) {
        throw (error);
    })

function makeData2(data) {
    for (let i = 0; i < data.length; i++) {
        year[i] = data[i].Year;
        org[i] = data[i].Org
        expense[i] = data[i].Expense;
        income[i] = data[i].Income

    }
}

function itemToLabel(item) {
    if (item == 'showIncome') return 'รายได้'
    if (item == 'showExpense') return 'ค่าใช้จ่าย'
}

function showChart() {

    selectedItem = $('#selectSubtype').val();
    selectedItemArray = eval(selectedItem);
    itemLabel = itemToLabel(selectedItem)

    if (selectedItem !== '' && selectedOrg !== '') {
        document.querySelector("#graph-container").innerHTML = '<canvas id="myChart4_1" width="200" height="50%"></canvas>';
        var data = {
            labels: showYear,
            datasets: [{
                label: itemLabel,
                backgroundColor: function() {
                    if (selectedItem == 'showIncome') return 'rgb(166,189,219,0.5)';
                    if (selectedItem == 'showExpense') return 'rgb(255,196,209,0.5)';
                },
                borderColor: function() {
                    if (selectedItem == 'showIncome') return 'blue';
                    if (selectedItem == 'showExpense') return 'red';
                },
                fill: true,
                data: selectedItemArray,
            }]
        };

        var config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        grid: {},
                        ticks: {},
                        title: {}
                    },
                    y: {
                        beginAtZero: false,
                        grid: {},
                        ticks: {

                        },
                        title: {}
                    }
                },
                animation: {},
                plugins: {
                    legend: {},
                    title: {},
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ' ' + context.parsed.y.toLocaleString() + ' ล้านบาท';
                            }
                        }

                    }
                }
            }
        };

        var myChart4_1 = new Chart(
            document.getElementById('myChart4_1'),
            config
        );

        console.log('Done')
    } else {
        console.log('Not enough data')

    }

}

$('#selectOrg').change(function() {
    console.log('select org is running')
    selectedOrg = $('#selectOrg').val()
    let countArray = 0;
    for (let i = 0; i < year.length; i++) {
        if (org[i] == selectedOrg) {
            showYear[countArray] = year[i]
            showExpense[countArray] = expense[i]
            showIncome[countArray] = income[i]
            countArray++;
        }
    }

    if (selectedOrg !== '') {
        showChart();
    }

});


$('#selectSubtype').change(function() {

    if (selectedOrg !== '') {
        showChart();
        // console.log(typeof myChart)
    } else {
        console.log('Please choose org.')
    }
});