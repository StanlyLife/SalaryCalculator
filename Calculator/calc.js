let WorkDaysPerYear = 230;
let WorkHoursPerDay = 7.5;
let PercentageVacation = 10.2;
let WorkWeeksPerYear = 52;
let WorkMonthsPerYear = 12;

class Tax {
    PersonalDeduction = 52450
    MinimumDeduction = 106750 + this.PersonalDeduction;
    MunicipalityTax = 2.7;
    CommuneTax = 12.15;
    SharedTax = 8.15;
    GeneralTax = 22;
    SalaryTax = 8.2;
    SocialTaxLimit = 59650;
    SocialTax = this.SalaryTax;
    Bracket1 = 0;
    Bracket2 = 1.7;
    Bracket3 = 4;
    Bracket4 = 13.2;
    Bracket5 = 16.2;
    Bracket6 = 0;
    Bracket1Start = 0;
    Bracket2Start = 184800;
    Bracket3Start = 260100;
    Bracket4Start = 651250;
    Bracket5Start = 1021550;
    Bracket6Start = 2000000;
    SocialTaxTotal = 0;
    BracketTaxTotal = 0;
    GeneralTaxTotal = 0;
    TaxTotal = 0;
    GetSalaryAfterTax(salary) {
        this.BracketTaxTotal = 0;
        const result = this.CalculateTax(salary);
        this.CalculateSocialTax(salary);
        this.CalculateGeneralTax((salary - this.MinimumDeduction));
        // console.log("Social Tax");
        // console.log(this.SocialTaxTotal.toFixed() + " -> 53 300");
        // console.log("Bracket Tax");
        // console.log(this.BracketTaxTotal.toFixed() + " -> 16 876");
        // console.log("General Tax");
        // console.log(this.GeneralTaxTotal.toFixed() + " -> 107 976");
        // console.log("-----Total tax-----");
        this.TaxTotal = (this.GeneralTaxTotal + this.BracketTaxTotal + this.SocialTaxTotal);
        // console.log(this.TaxTotal);
        console.log("NETTO FOR --------- " + salary);
        // console.log((salary / 12).toFixed());
        console.log(((salary - this.TaxTotal) / 12).toFixed());
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
}

class Salary {
    yearly = 0;
    monthly = 0;
    weekly = 0;
    daily = 0;
    hourly = 0;
    ReverseTax() {

    }
}

new Tax().GetSalaryAfterTax(650000);
new Tax().GetSalaryAfterTax(750000);
new Tax().GetSalaryAfterTax(775000);