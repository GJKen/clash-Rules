const proxyName = "代理模式";

function main(params) {
    if (!params.proxies) return params;
    overwriteRules(params);
    overwriteProxyGroups(params);
    overwriteDns(params);
    return params;
}
//覆写规则
function overwriteRules(params) {
    const customRules = [
        // 在此添加自定义规则, 最高优先级。
        // 示例1 ：使用 全局代理模式
        //"DOMAIN-SUFFIX,linux.do," + proxyName,
        // 示例2 ：使用 自定义代理组1
        //"DOMAIN-SUFFIX,gstatic.com,自定义代理组1",
        // 示例3 ：使用 自定义代理组2
        //"DOMAIN-SUFFIX,googleapis.com,自定义代理组2",
        "DOMAIN-SUFFIX,google.com," + proxyName,
        "DOMAIN-SUFFIX,googleapis.com," + proxyName,
        "DOMAIN-SUFFIX,gstatic.com," + proxyName,
        "DOMAIN-SUFFIX,gjkalist.us.kg,DIRECT",
        "DOMAIN-SUFFIX,gjkblog.us.kg,DIRECT",
        "DOMAIN-SUFFIX,liaoth.com,DIRECT",
        "DOMAIN-SUFFIX,gemini.gptnb.xyz," + proxyName,
        "DOMAIN-SUFFIX,app.img2ipfs.org," + proxyName,
        "DOMAIN-SUFFIX,saber.love," + proxyName,
        "DOMAIN-SUFFIX,naixi.net," + proxyName,
        "DOMAIN-SUFFIX,fanart.tv,自定义代理组1",
        "DOMAIN-SUFFIX,bangumi.tv,自定义代理组1",
        "DOMAIN-SUFFIX,bgm.tv,自定义代理组1",
        "DOMAIN-SUFFIX,serv00.com," + proxyName
    ];

    const rules = [
        ...customRules,
        "RULE-SET,reject,广告拦截",
        "RULE-SET,direct,DIRECT",
        "RULE-SET,cncidr,DIRECT",
        "RULE-SET,private,DIRECT",
        "RULE-SET,lancidr,DIRECT",
        "GEOIP,LAN,DIRECT,no-resolve",
        "GEOIP,CN,DIRECT,no-resolve",
        "RULE-SET,applications,应用程序代理",
        "RULE-SET,openai,ChatGPT",
        "RULE-SET,telegramcidr,电报消息,no-resolve",
        "RULE-SET,pikpakdrive,PikPak",
        "RULE-SET,tld-not-cn," + proxyName,
        "RULE-SET,google,Google",
        "RULE-SET,icloud," + proxyName,
        "RULE-SET,apple," + proxyName,
        "RULE-SET,gfw," + proxyName,
        "RULE-SET,greatfire," + proxyName,
        "RULE-SET,proxy," + proxyName,
        "MATCH,漏网之鱼",
    ];

    const ruleProviders = {
        reject: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
            path: "./ruleset/reject.yaml",
            interval: 86400,
        },
        icloud: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
            path: "./ruleset/icloud.yaml",
            interval: 86400,
        },
        apple: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
            path: "./ruleset/apple.yaml",
            interval: 86400,
        },
        google: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
            path: "./ruleset/google.yaml",
            interval: 86400,
        },
        proxy: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
            path: "./ruleset/proxy.yaml",
            interval: 86400,
        },
        openai: {
            type: "http",
            behavior: "classical",
            url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
            path: "./ruleset/custom/openai.yaml"
        },
        telegramcidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
            path: "./ruleset/custom/telegramcidr.yaml"
        },
        pikpakdrive: {
            type: "http",
            behavior: "classical",
            url: "https://raw.githubusercontent.com/GJKen/clash-Rules/refs/heads/main/Rules/PikPak.yaml",
            path: "./ruleset/custom/PikPak.yaml"
        },
        direct: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
            path: "./ruleset/direct.yaml",
            interval: 86400,
        },
        private: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
            path: "./ruleset/private.yaml",
            interval: 86400,
        },
        gfw: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
            path: "./ruleset/gfw.yaml",
            interval: 86400,
        },
        greatfire: {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt",
            path: "./ruleset/greatfire.yaml",
            interval: 86400,
        },
        "tld-not-cn": {
            type: "http",
            behavior: "domain",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
            path: "./ruleset/tld-not-cn.yaml",
            interval: 86400,
        },
        telegramcidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
            path: "./ruleset/telegramcidr.yaml",
            interval: 86400,
        },
        cncidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
            path: "./ruleset/cncidr.yaml",
            interval: 86400,
        },
        lancidr: {
            type: "http",
            behavior: "ipcidr",
            url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
            path: "./ruleset/lancidr.yaml",
            interval: 86400,
        },
        applications: {
           type: "http",
           behavior: "classical",
           url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
           path: "./custom/applications.yaml",
           interval: 86400,
        }
    };

    params["rule-providers"] = ruleProviders;
    params["rules"] = rules;
}
//覆写代理组
function overwriteProxyGroups(params) {
    // 添加自用代理
    params.proxies.push(
        //  { name: '1-香港-示例', type: *, server: **, port: *, cipher: **, password: **, udp: true }
    );

    // 所有代理
    const allProxies = params["proxies"].map((e) => e.name);
    // 自动选择代理组，按地区分组选延迟最低
    const autoProxyGroupRegexs = [
        { name: "HK-自动选择", regex: /香港|HK|Hong|🇭🇰/ },
        { name: "TW-自动选择", regex: /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/ },
        { name: "SG-自动选择", regex: /新加坡|狮城|SG|Singapore|🇸🇬/ },
        { name: "JP-自动选择", regex: /日本|JP|Japan|🇯🇵/ },
        { name: "US-自动选择", regex: /美国|US|United States|America|🇺🇸/ },
        { name: "其它-自动选择", regex: /(?!.*(?:剩余|到期|主页|官网|游戏|关注))(.*)/ },
        { name: "Google-自动选择", regex: /美国|US|United States|Japan|日本|JP|Singapore|新加坡|SG/ },
    ];

    const autoProxyGroups = autoProxyGroupRegexs
        .map((item) => ({
            name: item.name,
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex(params, item.regex),
            hidden: true,
        }))
        .filter((item) => item.proxies.length > 0);

    //手工选择代理组
    const manualProxyGroups = [
        { name: "HK-手工选择", regex: /香港|HK|Hong|🇭🇰/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg" },
        { name: "TW-手工选择", regex: /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg" },
        { name: "SG-手工选择", regex: /新加坡|狮城|SG|Singapore|🇸🇬/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg" },
        { name: "JP-手工选择", regex: /日本|JP|Japan|🇯🇵/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg" },
        { name: "US-手工选择", regex: /美国|US|United States|America|🇺🇸/, icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg" },
    ];

    const manualProxyGroupsConfig = manualProxyGroups
        .map((item) => ({
            name: item.name,
            type: "select",
            proxies: getManualProxiesByRegex(params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
        .filter((item) => item.proxies.length > 0);

    const groups = [
        {
            name: proxyName,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
            proxies: [
                "自动选择", "手动选择", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT",
            ],
        },
        {
            name: "手动选择",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
            proxies: allProxies,
        },
        {
            name: "自动选择",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
            proxies: ["ALL-自动选择"],
        },
        {
            name: "ALL-自动选择",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: allProxies,
            hidden: true,
        },
        {
            name: "自定义代理组1",
            type: "select",
            proxies: [proxyName, "手动选择", "HK-自动选择", "TW-自动选择", "SG-自动选择", "JP-自动选择", "US-自动选择", "其它-自动选择", "HK-手工选择", "TW-手工选择", "SG-手工选择", "JP-手工选择", "US-手工选择"],
            "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
        },
        {
            name: "PikPak",
            type: "select",
            proxies: [proxyName, "手动选择", "HK-自动选择", "TW-自动选择", "SG-自动选择", "JP-自动选择", "US-自动选择", "其它-自动选择", "HK-手工选择", "TW-手工选择", "SG-手工选择", "JP-手工选择", "US-手工选择"],
            // "include-all": true,
            icon: "https://cdn.img2ipfs.com/ipfs/QmSu1K5Hqm5kuvtRypFnbwFEpfuzXuswQi18qmYJyVahpy"
        },
        {
            name: "ChatGPT",
            type: "select",
            proxies: [proxyName, "手动选择", "HK-自动选择", "TW-自动选择", "SG-自动选择", "JP-自动选择", "US-自动选择", "其它-自动选择", "HK-手工选择", "TW-手工选择", "SG-手工选择", "JP-手工选择", "US-手工选择"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
        },
        {
            name: "电报消息",
            type: "select",
            proxies: [proxyName, "手动选择", "HK-自动选择", "TW-自动选择", "SG-自动选择", "JP-自动选择", "US-自动选择", "其它-自动选择", "HK-手工选择", "TW-手工选择", "SG-手工选择", "JP-手工选择", "US-手工选择"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
        },
        {
            name: "Google",
            type: "select",
            proxies: [proxyName, "手动选择", "Google-自动选择", "US-自动选择", "JP-自动选择", "SG-自动选择"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google.png"
        },
        {
            name: "应用程序代理",
            type: "select",
            proxies: [proxyName, "手动选择", "HK-自动选择", "TW-自动选择", "SG-自动选择", "JP-自动选择", "US-自动选择", "其它-自动选择", "HK-手工选择", "TW-手工选择", "SG-手工选择", "JP-手工选择", "US-手工选择"],
            // "include-all": true,
            icon: "https://cdn.img2ipfs.com/ipfs/QmSryYFqXaSDUioMU7f4dHfhxPNfsokXsCZYsvga2bLtsn"
        },
        {
            name: "负载均衡(散列)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "consistent-hashing",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "负载均衡(轮询)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "round-robin",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
        },
        {
            name: "广告拦截",
            type: "select",
            proxies: ["REJECT", "DIRECT", proxyName],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
        },
    ];

    autoProxyGroups.length &&
        groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
    groups.push(...autoProxyGroups);
    groups.push(...manualProxyGroupsConfig);
    params["proxy-groups"] = groups;
}

//防止dns泄露
function overwriteDns(params) {
    const cnDnsList = [
        "https://223.5.5.5/dns-query",
        "https://1.12.12.12/dns-query",
    ];
    const trustDnsList = [
        'quic://dns.cooluc.com',
        'quic://dns.cooluc.com',
        "https://1.0.0.1/dns-query",
        "https://1.1.1.1/dns-query",
        "https://8.8.8.8/dns-query", // 添加 Google DNS
        "https://9.9.9.9/dns-query", // 添加 Quad9 DNS
    ];

    const dnsOptions = {
        enable: true,
        "prefer-h3": true, // 如果DNS服务器支持DoH3会优先使用h3
        "default-nameserver": cnDnsList, // 用于解析其他DNS服务器、和节点的域名, 必须为IP, 可为加密DNS。注意这个只用来解析节点和其他的dns，其他网络请求不归他管
        nameserver: trustDnsList, // 其他网络请求都归他管

        // 这个用于覆盖上面的 nameserver
        "nameserver-policy": {
            //[combinedUrls]: notionDns,
            "geosite:cn": cnDnsList,
            "geosite:geolocation-!cn": trustDnsList,
            "+.google.com": ["https://8.8.8.8/dns-query", "https://8.8.4.4/dns-query"],
            "+.googleapis.com": ["https://8.8.8.8/dns-query", "https://8.8.4.4/dns-query"],
            "+.gstatic.com": ["https://8.8.8.8/dns-query", "https://8.8.4.4/dns-query"],
            // 如果你有一些内网使用的DNS，应该定义在这里，多个域名用英文逗号分割
            // '+.公司域名.com, www.4399.com, +.baidu.com': '10.0.0.1'
        },
        fallback: [
            "https://1.1.1.1/dns-query",
            "https://8.8.8.8/dns-query", // 添加 Google DNS 作为 fallback
            "https://9.9.9.9/dns-query", // 添加 Quad9 DNS 作为 fallback
        ],
        "fallback-filter": {
            geoip: true,
            //除了 geoip-code 配置的国家 IP, 其他的 IP 结果会被视为污染 geoip-code 配置的国家的结果会直接采用，否则将采用 fallback结果
            "geoip-code": "CN",
            //geosite 列表的内容被视为已污染，匹配到 geosite 的域名，将只使用 fallback解析，不去使用 nameserver
            geosite: ["gfw"],
            ipcidr: ["240.0.0.0/4"],
            domain: ["+.google.com",
                "+.facebook.com",
                "+.youtube.com",
                "*.twitter.com", // 添加更多需要 fallback 的域名
                "*.instagram.com",
                "*.cmliussss.com"],
        },
        "dns-cache": true, // 开启 DNS 缓存
         mode: "fake-ip" // 使用 fake-ip 模式避免 DNS 污染
    };
   
    // GitHub加速前缀
    const githubPrefix = "https://fastgh.lainbo.com/";

    // GEO数据GitHub资源原始下载地址
    const rawGeoxURLs = {
        geoip:
            "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
        geosite:
            "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
        mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    };

    // 生成带有加速前缀的GEO数据资源对象
    const accelURLs = Object.fromEntries(
        Object.entries(rawGeoxURLs).map(([key, githubUrl]) => [
            key,
            `${githubPrefix}${githubUrl}`,
        ])
    );

    const otherOptions = {
        "unified-delay": true,
        "tcp-concurrent": true,
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        sniffer: {
            enable: true,
            sniff: {
                TLS: {
                    ports: [443, 8443],
                },
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
            },
        },
        "geodata-mode": true,
        "geox-url": accelURLs,
    };

    params.dns = { ...params.dns, ...dnsOptions };
    Object.keys(otherOptions).forEach((key) => {
        params[key] = otherOptions[key];
    });
}

function getProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

function getManualProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["DIRECT", "手动选择", proxyName];
}
