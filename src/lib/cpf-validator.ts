 /**
  * Validates a Brazilian CPF number using the official algorithm
  * @param cpf - CPF string in any format (will be cleaned)
  * @returns true if CPF is valid, false otherwise
  */
 export function validateCPF(cpf: string): boolean {
   // Remove non-digits
   const cleanCpf = cpf.replace(/\D/g, "");
   
   // Must have 11 digits
   if (cleanCpf.length !== 11) {
     return false;
   }
   
   // Check for known invalid CPFs (all same digits)
   const invalidCpfs = [
     "00000000000",
     "11111111111",
     "22222222222",
     "33333333333",
     "44444444444",
     "55555555555",
     "66666666666",
     "77777777777",
     "88888888888",
     "99999999999",
   ];
   
   if (invalidCpfs.includes(cleanCpf)) {
     return false;
   }
   
   // Validate first check digit
   let sum = 0;
   for (let i = 0; i < 9; i++) {
     sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
   }
   let remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) {
     remainder = 0;
   }
   if (remainder !== parseInt(cleanCpf.charAt(9))) {
     return false;
   }
   
   // Validate second check digit
   sum = 0;
   for (let i = 0; i < 10; i++) {
     sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
   }
   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) {
     remainder = 0;
   }
   if (remainder !== parseInt(cleanCpf.charAt(10))) {
     return false;
   }
   
   return true;
 }