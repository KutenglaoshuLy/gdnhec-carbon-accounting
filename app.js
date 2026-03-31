// 省级电网排放因子 (tCO₂/MWh) - 来源于生态环境部与国家统计局联合发布的 2023 年电力二氧化碳排放因子
const provincialEmissionFactors = {
    '北京': 0.5554,
    '天津': 0.6796,
    '河北': 0.6516,
    '山西': 0.6634,
    '内蒙古': 0.6479,
    '辽宁': 0.4878,
    '吉林': 0.4671,
    '黑龙江': 0.5229,
    '上海': 0.5737,
    '江苏': 0.5827,
    '浙江': 0.4974,
    '安徽': 0.6553,
    '福建': 0.4211,
    '江西': 0.5836,
    '山东': 0.6191,
    '河南': 0.5897,
    '湖北': 0.4044,
    '湖南': 0.4976,
    '广东': 0.4419,
    '广西': 0.4476,
    '海南': 0.3648,
    '重庆': 0.5581,
    '四川': 0.1564,
    '贵州': 0.5683,
    '云南': 0.1333,
    '西藏': 0.2472, // 采用西南区域值
    '陕西': 0.6335,
    '甘肃': 0.4471,
    '青海': 0.1796,
    '宁夏': 0.6187,
    '新疆': 0.6021,
    '新疆生产建设兵团': 0.6021
};

// 化石燃料排放因子 (来自标准附录 A 表 A.1)
const fuelEmissionFactors = {
    'coal_anthracite': 2.429,      // 无烟煤 tCO₂/t
    'coal_bituminous': 2.174,      // 烟煤 tCO₂/t
    'fuel_oil': 0.002978,          // 燃料油 tCO₂/L
    'gasoline': 0.002179,          // 汽油 tCO₂/L
    'diesel': 0.002718,            // 柴油 tCO₂/L
    'kerosene': 0.002539,          // 一般煤油 tCO₂/L
    'natural_gas': 0.002184,       // 天然气 tCO₂/m³
    'lpg': 0.003166,               // 液化石油气 tCO₂/kg
    'coke_oven_gas': 0.0007984,    // 焦炉煤气 tCO₂/m³
    'pipeline_gas': 0.0006997      // 管道煤气 tCO₂/m³
};

// 燃料中文名称映射
const fuelNames = {
    'coal_anthracite': '无烟煤',
    'coal_bituminous': '烟煤',
    'fuel_oil': '燃料油',
    'gasoline': '汽油',
    'diesel': '柴油',
    'kerosene': '一般煤油',
    'natural_gas': '天然气',
    'lpg': '液化石油气',
    'coke_oven_gas': '焦炉煤气',
    'pipeline_gas': '管道煤气'
};

/**
 * 计算化石燃料燃烧排放
 */
function calculateFuel() {
    let totalDirect = 0;
    
    for (const fuelType in fuelEmissionFactors) {
        const input = document.getElementById(fuelType);
        const consumption = parseFloat(input.value) || 0;
        const emissionFactor = fuelEmissionFactors[fuelType];
        const emission = consumption * emissionFactor;
        
        // 更新该行排放量显示
        const emissionCell = input.parentElement.nextElementSibling.nextElementSibling;
        emissionCell.textContent = emission.toFixed(2);
        
        totalDirect += emission;
    }
    
    document.getElementById('totalDirectEmission').textContent = totalDirect.toFixed(2);
    return totalDirect;
}

/**
 * 计算外购电力排放
 */
function calculatePower() {
    const province = document.getElementById('province').value;
    const gridPowerConsumption = parseFloat(document.getElementById('grid_power_consumption').value) || 0;
    const greenPower = parseFloat(document.getElementById('green_power').value) || 0;
    const resalePower = parseFloat(document.getElementById('resale_power').value) || 0;
    
    if (!province) {
        document.getElementById('power_emission_factor').textContent = '请先选择省份';
        document.getElementById('power_indirect_emission').textContent = '0.00';
        return 0;
    }
    
    const emissionFactor = provincialEmissionFactors[province];
    document.getElementById('power_emission_factor').textContent = emissionFactor.toFixed(4) + ' tCO₂/MWh';
    
    // 计算外购电力排放（绿电排放因子为 0）
    const nonGreenPower = gridPowerConsumption - greenPower;
    const powerEmission = nonGreenPower * emissionFactor;
    
    // 扣除转供电排放
    const resaleEmission = resalePower * emissionFactor;
    const netPowerEmission = powerEmission - resaleEmission;
    
    document.getElementById('power_indirect_emission').textContent = Math.max(0, netPowerEmission).toFixed(2);
    
    return Math.max(0, netPowerEmission);
}

/**
 * 计算外购热力排放
 */
function calculateHeat() {
    const heatPurchase = parseFloat(document.getElementById('heat_purchase').value) || 0;
    const heatResale = parseFloat(document.getElementById('heat_resale').value) || 0;
    const heatEmissionFactor = parseFloat(document.getElementById('heat_emission_factor').value) || 0.11;
    
    // 外购热力排放 = (外购热量 - 转供热量) × 排放因子
    const heatEmission = (heatPurchase - heatResale) * heatEmissionFactor;
    
    document.getElementById('heat_indirect_emission').textContent = Math.max(0, heatEmission).toFixed(2);
    
    return Math.max(0, heatEmission);
}

/**
 * 计算总排放并展示结果
 */
function calculateTotal() {
    // 验证基本信息
    const orgName = document.getElementById('orgName').value.trim();
    const year = document.getElementById('year').value;
    const province = document.getElementById('province').value;
    
    if (!province) {
        alert('请选择所在省份！');
        return;
    }
    
    // 执行各项计算
    const directEmission = calculateFuel();
    const powerEmission = calculatePower();
    const heatEmission = calculateHeat();
    const totalEmission = directEmission + powerEmission + heatEmission;
    
    // 更新结果展示
    if (orgName) {
        document.getElementById('resultOrgName').textContent = orgName;
    } else {
        document.getElementById('resultOrgName').textContent = '某公共机构';
    }
    document.getElementById('resultYear').textContent = year + '年';
    
    document.getElementById('resultDirect').textContent = directEmission.toFixed(2);
    document.getElementById('resultPower').textContent = powerEmission.toFixed(2);
    document.getElementById('resultHeat').textContent = heatEmission.toFixed(2);
    document.getElementById('resultTotal').textContent = totalEmission.toFixed(2);
    
    // 生成详细信息
    generateDetailInfo(directEmission, powerEmission, heatEmission, totalEmission);
    
    // 显示结果汇总区域
    document.getElementById('resultSummary').style.display = 'block';
    
    // 滚动到结果区域
    document.querySelector('.result-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * 生成详细计算信息
 */
function generateDetailInfo(direct, power, heat, total) {
    // 直接排放明细
    const fuelDetails = [];
    for (const fuelType in fuelEmissionFactors) {
        const input = document.getElementById(fuelType);
        const consumption = parseFloat(input.value) || 0;
        if (consumption > 0) {
            const emission = consumption * fuelEmissionFactors[fuelType];
            fuelDetails.push(`${fuelNames[fuelType]}: ${consumption} × ${fuelEmissionFactors[fuelType].toFixed(6)} = ${emission.toFixed(2)} tCO₂`);
        }
    }
    
    if (fuelDetails.length > 0) {
        document.getElementById('resultDirectDetail').innerHTML = fuelDetails.join('<br>');
    } else {
        document.getElementById('resultDirectDetail').textContent = '无化石燃料消耗';
    }
    
    // 电力排放明细
    const province = document.getElementById('province').value;
    const gridPower = parseFloat(document.getElementById('grid_power_consumption').value) || 0;
    const greenPower = parseFloat(document.getElementById('green_power').value) || 0;
    const resalePower = parseFloat(document.getElementById('resale_power').value) || 0;
    
    let powerDetail = `外购电量：${gridPower} MWh`;
    if (greenPower > 0) {
        powerDetail += `<br>其中绿电：${greenPower} MWh (排放因子=0)`;
    }
    powerDetail += `<br>省份电网因子：${provincialEmissionFactors[province].toFixed(4)} tCO₂/MWh`;
    if (resalePower > 0) {
        powerDetail += `<br>扣除转供电：${resalePower} MWh`;
    }
    document.getElementById('resultPowerDetail').innerHTML = powerDetail;
    
    // 热力排放明细
    const heatPurchase = parseFloat(document.getElementById('heat_purchase').value) || 0;
    const heatResale = parseFloat(document.getElementById('heat_resale').value) || 0;
    const heatFactor = parseFloat(document.getElementById('heat_emission_factor').value) || 0.11;
    
    let heatDetail = `外购热量：${heatPurchase} GJ`;
    if (heatResale > 0) {
        heatDetail += `<br>扣除转供热：${heatResale} GJ`;
    }
    heatDetail += `<br>排放因子：${heatFactor} tCO₂/GJ`;
    document.getElementById('resultHeatDetail').innerHTML = heatDetail;
    
    // 总量计算说明
    document.getElementById('resultTotalDetail').innerHTML = 
        `E<sub>总</sub> = ${direct.toFixed(2)} + ${power.toFixed(2)} + ${heat.toFixed(2)} = ${total.toFixed(2)} tCO₂`;
}

/**
 * 重置表单
 */
function resetForm() {
    if (confirm('确定要清空所有输入数据吗？')) {
        // 重置所有输入框
        const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
        inputs.forEach(input => {
            input.value = '';
        });
        
        // 重置选择框
        document.getElementById('province').value = '';
        document.getElementById('year').value = '2026';
        document.getElementById('heat_emission_factor').value = '0.11';
        
        // 重置表格中的排放量显示
        const emissionCells = document.querySelectorAll('.data-table .emission');
        emissionCells.forEach(cell => {
            cell.textContent = '0.00';
        });
        
        // 重置合计值
        document.getElementById('totalDirectEmission').textContent = '0.00';
        document.getElementById('power_emission_factor').textContent = '-';
        document.getElementById('power_indirect_emission').textContent = '0.00';
        document.getElementById('heat_indirect_emission').textContent = '0.00';
        
        // 隐藏结果汇总
        document.getElementById('resultSummary').style.display = 'none';
    }
}

/**
 * 导出报告（PDF 格式）
 */
function exportReport() {
    const resultSummary = document.getElementById('resultSummary');
    if (resultSummary.style.display === 'none') {
        alert('请先进行计算再生成报告！');
        return;
    }
    
    const orgName = document.getElementById('orgName').value.trim();
    const year = document.getElementById('year').value;
    const province = document.getElementById('province').value;
    
    const displayOrgName = orgName || '某公共机构';
    
    // 创建打印窗口
    const printWindow = window.open('', '_blank');
    
    const reportHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>公共机构碳排放核算报告 - ${displayOrgName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Microsoft YaHei', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.8; }
        .report-container { max-width: 800px; margin: 0 auto; background: white; }
        .report-header { text-align: center; border-bottom: 3px solid #2ecc71; padding-bottom: 20px; margin-bottom: 30px; }
        .report-title { font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
        .report-subtitle { font-size: 14px; color: #7f8c8d; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 12px; margin-bottom: 15px; background: #f8f9fa; padding: 8px 12px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .info-table td { padding: 10px; border-bottom: 1px solid #ecf0f1; }
        .info-table td:first-child { font-weight: bold; width: 35%; color: #34495e; }
        .result-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
        .result-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; }
        .result-card.highlight { background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); }
        .result-card-title { font-size: 14px; margin-bottom: 10px; opacity: 0.9; }
        .result-card-value { font-size: 28px; font-weight: bold; }
        .result-card-unit { font-size: 14px; margin-top: 5px; opacity: 0.8; }
        .detail-box { background: #f8f9fa; border-left: 3px solid #3498db; padding: 15px; margin: 15px 0; font-size: 13px; }
        .formula-box { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .formula-item { margin: 10px 0; font-family: 'Courier New', monospace; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ecf0f1; text-align: center; font-size: 12px; color: #95a5a6; }
        @media print { body { padding: 20px; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <div class="report-title">🌱 公共机构碳排放核算报告</div>
            <div class="report-subtitle">依据《公共机构碳排放核算指南》（JS_T 303-2026）标准</div>
        </div>

        <div class="section">
            <div class="section-title">一、基本信息</div>
            <table class="info-table">
                <tr><td>机构名称</td><td>${displayOrgName}</td></tr>
                <tr><td>核算年度</td><td>${year}年</td></tr>
                <tr><td>所在省份</td><td>${province}</td></tr>
                <tr><td>核算依据</td><td>《公共机构碳排放核算指南》（JS_T 303-2026）</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">二、核算结果</div>
            <div class="result-grid">
                <div class="result-card"><div class="result-card-title">🔥 直接排放</div><div class="result-card-value">${document.getElementById('resultDirect').textContent}</div><div class="result-card-unit">tCO₂</div></div>
                <div class="result-card"><div class="result-card-title">⚡ 外购电力间接排放</div><div class="result-card-value">${document.getElementById('resultPower').textContent}</div><div class="result-card-unit">tCO₂</div></div>
                <div class="result-card"><div class="result-card-title">🌡️ 外购热力间接排放</div><div class="result-card-value">${document.getElementById('resultHeat').textContent}</div><div class="result-card-unit">tCO₂</div></div>
                <div class="result-card highlight"><div class="result-card-title">🌍 碳排放总量</div><div class="result-card-value">${document.getElementById('resultTotal').textContent}</div><div class="result-card-unit">tCO₂</div></div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">三、详细计算说明</div>
            <div class="detail-box"><strong>1. 直接排放明细：</strong><br>${document.getElementById('resultDirectDetail').innerHTML}</div>
            <div class="detail-box"><strong>2. 外购电力排放明细：</strong><br>${document.getElementById('resultPowerDetail').innerHTML}</div>
            <div class="detail-box"><strong>3. 外购热力排放明细：</strong><br>${document.getElementById('resultHeatDetail').innerHTML}</div>
        </div>

        <div class="section">
            <div class="section-title">四、计算公式</div>
            <div class="formula-box">
                <div class="formula-item"><strong>排放总量：</strong>E<sub>总</sub> = E<sub>直接</sub> + E<sub>间接</sub></div>
                <div class="formula-item"><strong>直接排放：</strong>E<sub>直接</sub> = ∑(FC<sub>i</sub> × EF<sub>i,直接</sub>)</div>
                <div class="formula-item"><strong>间接排放：</strong>E<sub>间接</sub> = E<sub>电力</sub> + E<sub>热力</sub></div>
                <div class="formula-item"><strong>电力排放：</strong>E<sub>电力</sub> = AD<sub>外购电力</sub> × EF<sub>外购电力</sub> - AD<sub>转供电力</sub> × EF<sub>转供电力</sub></div>
                <div class="formula-item"><strong>热力排放：</strong>E<sub>热力</sub> = AD<sub>外购热力</sub> × EF<sub>外购热力</sub> - AD<sub>转供热力</sub> × EF<sub>转供热力</sub></div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">五、数据来源说明</div>
            <p style="margin: 10px 0;">本报告数据由公共机构碳排放核算系统自动生成，计算方法和排放因子均依据《公共机构碳排放核算指南》（JS_T 303-2026）标准。</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>化石燃料排放因子来源：标准附录 A 表 A.1</li>
                <li>电力排放因子来源：生态环境部与国家统计局联合发布的省级电网年平均供电排放因子</li>
                <li>热力排放因子：默认 0.11 tCO₂/GJ（或采用国家温室气体排放因子数据库最新值）</li>
            </ul>
        </div>

        <div class="footer">
            <p>生成时间：${new Date().toLocaleString('zh-CN')}</p>
            <p>本报告由公共机构碳排放核算系统自动生成 | 依据标准：JS_T 303-2026</p>
        </div>
    </div>

    <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print();" style="padding: 12px 30px; font-size: 16px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 10px;">🖨️ 打印/保存为 PDF</button>
        <button onclick="window.close();" style="padding: 12px 30px; font-size: 16px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 10px;">关闭窗口</button>
    </div>

    <script>window.onload = function() { setTimeout(function() { alert('💡 提示：点击"打印/保存为 PDF"按钮，在打印目标中选择"另存为 PDF"即可生成 PDF 报告！'); }, 500); };<\/script>
</body>
</html>`;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
}

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('公共机构碳排放核算系统已就绪');
    console.log('依据标准：《公共机构碳排放核算指南》（JS_T 303-2026）');
});
