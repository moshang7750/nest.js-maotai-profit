import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
const xlsx = require('node-xlsx');
const fs = require('fs');
@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor() {

    }
    async getProduct() {
        const url = `http://quotes.money.163.com/f10/zycwzb_600519.html#01c01`;
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        let tdStr = $('.col_r .table_bg001  tbody tr:nth-child(12)').html()
        let reg = /<td[\S\s]*?>([\S\s]*?)<\/td>/gi;
        let result = [];
        let a
        while ((a = reg.exec(tdStr)) != null) {
            result.push(a[1].replace('\n', ''));
        }
        let datas = []
        let title = ['净利润(扣除非经常性损益后)(万元)']

        datas = [title, result]
        this.writeExcel(title[0] + this.GetDateStr(), datas);
        return;
    }
    writeExcel(name, data) {
        var buffer = xlsx.build([{ name: 'sheet1', data: data }]);
        fs.writeFileSync(name + '.xlsx', buffer, { 'flag': 'w' });
    }
    GetDateStr() {
        return new Date().toLocaleDateString();
    }

}