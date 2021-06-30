function formatReal(valor) {  
  return parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
}


export {formatReal};
