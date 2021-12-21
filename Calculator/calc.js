let WorkDaysPerYear = 230;
let WorkHoursPerDay = 7.5;
let PercentageVacation = 10.2;
let WorkWeeksPerYear = 52;
let WorkMonthsPerYear = 12;

class Tax {
    PersonalDeduction = 52450 //personfradrag
    MinimumDeduction = 106750; //Minstefradrag
    Deductions = this.MinimumDeduction + this.PersonalDeduction; //Minstefradrag + personfradrag
    SocialTaxLimit = 59650; //Nedre grense for trygde avgift
    SocialTax = 8.2; //Trygde avgift
    GeneralTax = 22;
    //Trinnskatt
    Bracket1 = 0;
    Bracket2 = 1.7;
    Bracket3 = 4;
    Bracket4 = 13.2;
    Bracket5 = 16.2;
    Bracket6 = 0;
    //trinnskatt start
    Bracket1Start = 0;
    Bracket2Start = 184800;
    Bracket3Start = 260100;
    Bracket4Start = 651250;
    Bracket5Start = 1021550;
    Bracket6Start = 2000000;
    //Calculations
    SocialTaxTotal = 0;
    BracketTaxTotal = 0;
    GeneralTaxTotal = 0;
    TaxTotal = 0;
    GetSalaryAfterTax(salary) {
        this.BracketTaxTotal = 0;
        const result = this.CalculateTax(salary);
        this.CalculateSocialTax(salary);
        this.CalculateGeneralTax((salary - this.Deductions));
        this.TaxTotal = (this.GeneralTaxTotal + this.BracketTaxTotal + this.SocialTaxTotal);
        return {
            TaxTotal:   Number(this.TaxTotal).toLocaleString("es-ES", {minimumFractionDigits: 2})  ,
            SocialTax:  Number(this.SocialTaxTotal).toLocaleString("es-ES", {minimumFractionDigits: 2})  ,
            BracketTax: Number(this.BracketTaxTotal).toLocaleString("es-ES", {minimumFractionDigits: 2})  ,
            GeneralTax: Number(this.GeneralTaxTotal).toLocaleString("es-ES", {minimumFractionDigits: 2})  ,
            SalaryAfterTax: Number((salary - this.TaxTotal)).toLocaleString("es-ES", {minimumFractionDigits: 2})
        }
    }
    CalculateSocialTax(salary){
        const SocialTaxCost = (salary * (1-(this.SocialTax/100)));
        this.SocialTaxTotal = (salary - SocialTaxCost);
    }
    CalculateGeneralTax(salary){
        /* GENERAL TAX COST */
        let generalTax = (salary * (1-(this.GeneralTax/100)));
        this.GeneralTaxTotal = (salary - generalTax)
    }
    CalculateTax(salary) {
        if (salary > this.Bracket2Start) {
            let bracket = "Bracket2"; 
            if(salary > this.Bracket6Start) bracket = "Bracket6";
            if(salary > this.Bracket5Start) bracket = "Bracket5";
            if(salary > this.Bracket4Start) bracket = "Bracket4";
            if(salary > this.Bracket3Start) bracket = "Bracket3";
            const remainder = salary - this[bracket+"Start"];
            let bracketTax = (remainder * (1-(this[bracket]/100)));
            this.BracketTaxTotal += (remainder - bracketTax);
            //TAX CALCULATION
            this.CalculateTax(this[bracket+"Start"]);
        } else {
            return salary;
        }
    }
    GetSalaryBeforeTax(salary){
        console.log("Salary: " + salary);
        this.BracketTaxTotal = 0;
        var bracketTax = this.ReverseBracketTax(salary);
        console.log("Tax total: "+this.BracketTaxTotal + " - 16.876");
    }
    ReverseBracketTax(salary) {
            if (salary > this.Bracket2Start)  salary =  this.GetBracketTax(salary,"Bracket2")
            if(salary > this.Bracket3Start)   salary =  this.GetBracketTax(salary,"Bracket3");
            if(salary > this.Bracket4Start)   salary =  this.GetBracketTax(salary,"Bracket4");
            if(salary > this.Bracket5Start)   salary =  this.GetBracketTax(salary,"Bracket5");
            if(salary > this.Bracket6Start)   salary =  this.GetBracketTax(salary,"Bracket6");
            return this.BracketTaxTotal;
    }
    GetBracketTax(salary, bracket){
        const remainder = salary - this[bracket+"Start"];
        let bracketTax = (remainder * (100/(100-(this[bracket]))));
        console.log(bracket + " " + (bracketTax - remainder) );
        this.BracketTaxTotal += (bracketTax - remainder);
        salary += (bracketTax - remainder);
        return salary;
    }
    
}

// const remainder = (yrly - 184800);
// const preTax = (remainder * (100/(100-(tax.trinn1 +tax.inntektsskatt))))


class Salary {
    yearly = 0;
    monthly = 0;
    weekly = 0;
    daily = 0;
    hourly = 0;
    ReverseTax() {

    }
}

// console.log(new Tax().GetSalaryAfterTax(650000));
new Tax().GetSalaryBeforeTax(471847);