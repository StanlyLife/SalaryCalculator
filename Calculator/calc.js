
const tax = {
    _trinn1: 1.7,
    _trinn2: 4.0,
    _trinn3: 13.2,
    _trinn4: 16.2,
    _inntektsskatt: 22,
    _trygdeSkatt: 3,

    get trinn1(){
        return this._trinn1;
    },
    get trinn2(){
        return this._trinn2;
    },
    get trinn3(){
        return this._trinn3;
    },
    get trinn4(){
        return this._trinn4;
    },
    get inntektsskatt(){
        return this._inntektsskatt;
    },
    get trygdeSkatt(){
        return this._trygdeSkatt;
    },
    set trinn1(val){
        return document.querySelector("#input-trinn1").value = this.trinn1 = val;
    },
    set trinn2(val){
        return document.querySelector("#input-trinn2").value = this.trinn2 = val;
    },
    set trinn3(val){
        return document.querySelector("#input-trinn3").value = this.trinn3 = val;
    },
    set trinn4(val){
        return document.querySelector("#input-trinn4").value = this.trinn4 = val;
    },
}
let WorkDaysPerYear = 230;
let WorkHoursPerDay = 7.5;
let PercentageVacation = 10.2;
let WorkWeeksPerYear = 52;
let WorkMonthsPerYear = 12;
const Salary = {
    preTax : {
        _yearlyPostTax: 0,
        _yearly: 0,
        _monthly: 0,
        _weekly: 0,
        _daily: 0,
        _hourly: 0,
        get yearly(){
            return this._yearly;
        },
        get monthly(){
            return this._monthly;
        },
        get weekly(){
            return this._weekly;
        },
        get daily(){
            return this._daily;
        },
        set yearly(val){
            this._yearly = val;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("yearly", true);
        },
        set monthly(val){
            this._monthly = val;
            this._yearly = this._monthly* WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("monthly", true);
        },
        set weekly(val){
            this._weekly = val;
            this._yearly = this._weekly* WorkWeeksPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("weekly", true);
        },
        set daily(val){
            this._daily = val;
            this._yearly = this._daily* WorkDaysPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("daily", true);
        },
        set hourly(val){
            this._hourly = val;
            this._daily = val * WorkHoursPerDay;
            this._yearly = this._daily* WorkDaysPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this.UpdateSalary("hourly", true);
        },
        UpdateSalary(period, updateTax){
            this._yearly = parseInt(this._yearly).toFixed(0);
            this._monthly = parseInt(this._monthly).toFixed(0);
            this._weekly = parseInt(this._weekly).toFixed(0);
            this._daily = parseInt(this._daily).toFixed(0);
            this._hourly = parseInt(this._hourly).toFixed(0);
            if(updateTax)
                Salary.postTax.CalculateTaxFromPreTax(this._yearly);
            if(period != "yearly")
                document.querySelector("#pre-input-yearly").value = this._yearly;
            if(period != "monthly")
                document.querySelector("#pre-input-monthly").value = this._monthly;
            if(period != "weekly")
                document.querySelector("#pre-input-weekly").value = this._weekly;
            if(period != "daily")
                document.querySelector("#pre-input-daily").value = this._daily;
            if(period != "hourly")
                document.querySelector("#pre-input-hourly").value = this._hourly;
        },
        ReverseTax(postTax){
            if(postTax){
                this._yearly = postTax;
            }
            const salaryAfterTrygd = this.CalculateTrygd(this._yearly);
            if(this._yearly > 1021550){
                this._yearly = this.CalculateTaxBracket4(this._yearly);
            }else if(this._yearly > 651250){
                this._yearly = this.CalculateTaxBracket3(this._yearly);
            }else if(this._yearly > 260100){
                this._yearly = this.CalculateTaxBracket2(this._yearly);
            }else if(this._yearly > 184800){
                this._yearly = this.CalculateTaxBracket1(this._yearly);
            }else {
                this._yearly = this.CalculateTaxBracket0((this._yearly));
            }
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("", false);
        },
        CalculateTrygd(yrly){
            const trygdeGrense = 59632;
            const remainder = (yrly - trygdeGrense);
            const preTax = (remainder * (100/(100-(3))));
            return preTax + trygdeGrense;
        },
        CalculateTaxBracket0(yrly) {
            const preTax = (yrly * (100/(100-(tax.inntektsskatt))))
            return preTax;
        },
        CalculateTaxBracket1(yrly) {
            const remainder = (yrly - 184800);
            const preTax = (remainder * (100/(100-(tax.trinn1 +tax.inntektsskatt))))
            return preTax + this.CalculateTaxBracket0(184800);
        },
        CalculateTaxBracket2(yrly) {
            const remainder = (yrly - 260100);
            const preTax = (remainder * (100/(100-(tax.trinn2 + tax.inntektsskatt))))
            return preTax + this.CalculateTaxBracket1(260100);
        },
        CalculateTaxBracket3(yrly) {
            const remainder = (yrly - 651250);
            const preTax = (remainder * (100/(100-(tax.trinn3 + tax.inntektsskatt))))
            return preTax + this.CalculateTaxBracket2(651250);
        },
        CalculateTaxBracket4(yrly) {
            const remainder = (yrly - 1021550);
            const preTax = (remainder * (100/(100-(tax.trinn4 + tax.inntektsskatt))))
            return preTax + this.CalculateTaxBracket3(1021550);
        },

    },
    postTax : {
        _yearly: 0,
        _monthly: 0,
        _weekly: 0,
        _daily: 0,
        _hourly: 0,
        get yearly(){
            return this._yearly;
        },
        get monthly(){
            return this._monthly;
        },
        get weekly(){
            return this._weekly;
        },
        get daily(){
            return this._daily;
        },
        set yearly(val){
            this._yearly = val;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("yearly", false);
        },
        set monthly(val){
            this._monthly = val;
            this._yearly = this._monthly * WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("monthly", false);
        },
        set weekly(val){
            this._weekly = val;
            this._yearly = this._weekly* WorkWeeksPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("weekly", false);
        },
        set daily(val){
            this._daily = val;
            this._yearly = this._daily* WorkDaysPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
            this.UpdateSalary("daily", false);
        },
        set hourly(val){
            this._hourly = val;
            this._daily = val * WorkHoursPerDay;
            this._yearly = this._daily* WorkDaysPerYear;
            this._monthly = this._yearly / WorkMonthsPerYear;
            this._weekly = this._yearly / WorkWeeksPerYear;
            this.UpdateSalary("hourly", false);
        },
        CalculateTaxFromPreTax(yearlyPreTax){
            this.CalculateTax(yearlyPreTax);
            this.SetFixed();
            document.querySelector("#post-input-yearly").value = this._yearly;
            document.querySelector("#post-input-monthly").value = this._monthly;
            document.querySelector("#post-input-weekly").value = this._weekly;
            document.querySelector("#post-input-daily").value = this._daily;
            document.querySelector("#post-input-hourly").value = this._hourly;
        },
        SetFixed(){
            this._yearly = parseInt(this._yearly).toFixed(0);
            this._monthly = parseInt(this._monthly).toFixed(0);
            this._weekly = parseInt(this._weekly).toFixed(0);
            this._daily = parseInt(this._daily).toFixed(0);
            this._hourly = parseInt(this._hourly).toFixed(0);
        },
        UpdateSalary(period, updateTax){
            //calcualte tax
            if(updateTax){
                this.CalculateTax();
            }else {
                Salary.preTax.ReverseTax(this._yearly);
            }
            //set to fixed
            this.SetFixed();

            if(period != "yearly")
                document.querySelector("#post-input-yearly").value = this._yearly;
            if(period != "monthly")
                document.querySelector("#post-input-monthly").value = this._monthly;
            if(period != "weekly")
                document.querySelector("#post-input-weekly").value = this._weekly;
            if(period != "daily")
                document.querySelector("#post-input-daily").value = this._daily;
            if(period != "hourly")
                document.querySelector("#post-input-hourly").value = this._hourly;
        },
        CalculateTax(yearlyPreTax){
            console.log(this._yearly);
            if(yearlyPreTax){
                this._yearly = yearlyPreTax;
            }
            this._yearly = this.CalculateSalaryTaxes(this._yearly);
            if(this._yearly > 1021550){
                this._yearly = this.CalculateTaxBracket4(this._yearly);
            }else if(this._yearly > 651250){
                this._yearly = this.CalculateTaxBracket3(this._yearly);
            }else if(this._yearly > 260100){
                this._yearly = this.CalculateTaxBracket2(this._yearly);
            }else if(this._yearly > 184800){
                this._yearly = this.CalculateTaxBracket1(this._yearly);
            }
            this._monthly = this._yearly / 12;
            this._weekly = this._yearly / 52;
            this._daily = this._yearly / WorkDaysPerYear;
            this._hourly = this._daily / WorkHoursPerDay;
        },
        CalculateSalaryTaxes(yrly){
            const trygdeGrense = 59632;
            if(yrly > 59632){
                const RegularTax = (((yrly - trygdeGrense) / 100) * (tax._trygdeSkatt + tax._inntektsskatt));
                const TrygdTax = ((trygdeGrense) / 100) * (tax._inntektsskatt);
                const salaryAfterTax = yrly - RegularTax - TrygdTax;
                return salaryAfterTax;
            }
            const RegularTax = (((yrly) / 100) * (tax._inntektsskatt));
            return yrly - RegularTax;

        },
        CalculateTaxBracket1(yrly) {
            const remainder = (yrly - 184800);
            const taxes = ((remainder / 100) * (tax.trinn1));
            const afterTax = remainder - taxes;
            return afterTax;
        },
        CalculateTaxBracket2(yrly) {
            const remainder = (yrly - 260100);
            const taxes = ((remainder / 100) * (tax.trinn2));
            const afterTax = remainder - taxes;
            return afterTax + this.CalculateTaxBracket1(260100);
        },
        CalculateTaxBracket3(yrly) {
            const remainder = (yrly - 651250);
            const taxes = ((remainder / 100) * (tax.trinn3));
            const afterTax = remainder - taxes;
            return afterTax + this.CalculateTaxBracket2(651250);
        },
        CalculateTaxBracket4(yrly) {
            const remainder = (yrly - 1021550);
            const taxes = ((remainder / 100) * (tax.trinn4));
            const afterTax = remainder - taxes;
            return afterTax + this.CalculateTaxBracket3(1021550);
        },

    }
}

SetEventListeners(".dynamic");
function SetEventListeners(selector){
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener("input", function(){
            SalaryChange(this);
        });
    });
}

function SalaryChange(element){
    console.log(element);
    console.log(element.value);
    if(element.classList.contains("post")){
        CalculateSalaryFromPostTax(element);
    }
    if(element.classList.contains("pre")){
        CalculateSalaryFromPreTax(element);
    }
    if(element.classList.contains("tax")){
    }

    function CalculateSalaryFromPreTax(element){
        Salary.preTax[element.dataset.period] = parseInt(element.value);
    }
    function CalculateSalaryFromPostTax(element){
        Salary.postTax[element.dataset.period] = parseInt(element.value);
    }
}
