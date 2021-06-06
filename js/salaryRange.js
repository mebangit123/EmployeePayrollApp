const  salary = document.querySelector('#salary')
        const salaryOutput = document.querySelector('.salary-output')
        salary.addEventListener('input', function(){
           salaryOutput.textContent = salary.value
            })