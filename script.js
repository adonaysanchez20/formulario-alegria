  const form = document.getElementById('form-exposicion');

  // Pega aquí la URL que te da Formspree (paso 2), reemplazando el ejemplo:
  const FORMSPREE_URL = 'https://formspree.io/f/meaqlnal';

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.field[data-required]').forEach(function(field){
      field.classList.remove('has-error');
      const type = field.getAttribute('data-type');
      if(type === 'radio'){
        const checked = field.querySelector('input[type="radio"]:checked');
        if(!checked){ field.classList.add('has-error'); valid = false; }
      } else {
        const input = field.querySelector('input');
        if(!input.value.trim()){ field.classList.add('has-error'); valid = false; }
        if(type === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())){
          field.classList.add('has-error'); valid = false;
        }
      }
    });

    if(!valid) return;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function(response){
        if(response.ok){
          form.style.display = 'none';
          document.getElementById('gracias').style.display = 'block';
        } else {
          throw new Error('Respuesta no válida del servidor');
        }
      })
      .catch(function(){
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar respuestas';
        alert('Hubo un problema al enviar tus respuestas. Intenta de nuevo.');
      });
  });
