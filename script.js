// Retrieving references to HTML elements
var text_num1 = document.getElementById('num1')
var text_num2 = document.getElementById('num2')
var text_operator = document.getElementById('operator')
var checkbox_container = document.getElementById('checkboxes')
var checkbox_all = document.querySelectorAll(
  '#checkboxes input[type="checkbox"]'
)
var option = document.createElement('option')
var expanded = false;

// Event listener for submit button
document.getElementById('submit').addEventListener('click', function () {
  // Retrieving values of number 1, number 2, and selected operator
  var num1 = parseFloat(text_num1.value)
  var num2 = parseFloat(text_num2.value)
  var operator = text_operator.value

  // Performing calculation based on the operator and displaying the result
  const result = operator === '/' && num2 === 0 ? 'Infinity' : eval(`${num1} ${operator} ${num2}`)

  document.getElementById('result').value = result
})

// Function to clear result field
function clearResult() {
  document.getElementById('result').value = ''
}

// Event listeners to clear result when number inputs change
text_num1.addEventListener('change', clearResult)
text_num2.addEventListener('change', clearResult)

// Function to toggle visibility of checkboxes
function showCheckboxes() {
  checkbox_container.style.width = expanded ? '0%' : '94%'
  checkbox_container.classList.replace(
    expanded ? 'd-block' : 'd-none',
    expanded ? 'd-none' : 'd-block'
  )
  expanded = !expanded
}

// Function to update selected operator in the dropdown
function updateSelect(checkbox) {
  text_operator.innerHTML = ''
  for (var i = 0; i < checkbox_all.length; i++) {
    checkbox_all[i].disabled = false
    if (checkbox_all[i] !== checkbox && checkbox_all[i].checked) {
      checkbox_all[i].checked = false
    } else if (checkbox_all[i].checked) {
      option.text = checkbox.value
      option.value = checkbox.value
      text_operator.appendChild(option)
      checkbox_container.classList.replace('d-block', 'd-none')
      expanded = false
      checkbox.disabled = true
      clearResult()
    }
  }

  // Toggle 'selected' class on corresponding labels
  checkbox_all.forEach(checkbox => {
    var label = document.querySelector('label[for="' + checkbox.id + '"]')
    if (label && checkbox.checked) {
      label.classList.add('selected')
    } else if (label) {
      label.classList.remove('selected')
    }
  })
}
