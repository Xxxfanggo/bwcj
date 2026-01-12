package com.zfy.bwcj.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @文件名: HomeController.java
 * @工程名: bwcj-back
 * @包名: com.zfy.bwcj.controller
 * @描述:
 * @创建人: zhongfangyu
 * @创建时间: 2026-01-09 18:39
 * @版本号: V2.4.0
 */
@Controller
public class HomeController {
    @RequestMapping("/")
    public String index() {
        return "redirect:/index.html"; // 转发到前端入口
    }
}
