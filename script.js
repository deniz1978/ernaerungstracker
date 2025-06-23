document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form');
    const entriesList = document.getElementById('entries');
    const totalsDiv = document.getElementById('totals');
    const entryDate = document.getElementById('entry-date');

    // Default date is today
    const today = new Date().toISOString().split('T')[0];
    entryDate.value = today;

    function loadEntries(date) {
        const data = JSON.parse(localStorage.getItem(date)) || [];
        entriesList.innerHTML = '';
        let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

        data.forEach((entry, idx) => {
            const li = document.createElement('li');
            li.textContent = `${entry.food} - ${entry.calories} kcal, ` +
                `${entry.protein}g Eiweiß, ${entry.carbs}g Kohlenhydrate, ${entry.fat}g Fett`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Entfernen';
            removeBtn.addEventListener('click', () => {
                data.splice(idx, 1);
                localStorage.setItem(date, JSON.stringify(data));
                loadEntries(date);
            });
            li.appendChild(removeBtn);
            entriesList.appendChild(li);

            totals.calories += Number(entry.calories);
            totals.protein += Number(entry.protein);
            totals.carbs += Number(entry.carbs);
            totals.fat += Number(entry.fat);
        });

        totalsDiv.textContent = `Gesamt: ${totals.calories} kcal, ` +
            `${totals.protein}g Eiweiß, ${totals.carbs}g Kohlenhydrate, ${totals.fat}g Fett`;
    }

    entryDate.addEventListener('change', () => loadEntries(entryDate.value));

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = {
            food: document.getElementById('food-name').value,
            calories: document.getElementById('calories').value,
            protein: document.getElementById('protein').value,
            carbs: document.getElementById('carbs').value,
            fat: document.getElementById('fat').value
        };
        const date = entryDate.value;
        const data = JSON.parse(localStorage.getItem(date)) || [];
        data.push(entry);
        localStorage.setItem(date, JSON.stringify(data));
        entryForm.reset();
        entryDate.value = date;
        loadEntries(date);
    });

    loadEntries(entryDate.value);
});
