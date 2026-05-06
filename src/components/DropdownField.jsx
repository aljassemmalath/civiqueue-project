import { useState, useRef, useEffect } from 'react';

function DropdownField({ placeholder, options, groups, value, onChange, searchable, multiple, size, error }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allItems = groups
    ? groups.flatMap(g => g.items)
    : options || [];

  const filteredGroups = groups
    ? groups.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
      })).filter(g => g.items.length > 0)
    : null;

  const filteredOptions = options
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : null;

  const getDisplayText = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return value.map(v => allItems.find(i => i.value === v)?.label).filter(Boolean).join(', ');
    }
    if (!multiple && value) {
      return allItems.find(i => i.value === value)?.label || placeholder;
    }
    return placeholder;
  };

  const handleSelect = (itemValue) => {
    if (multiple) {
      const newVal = Array.isArray(value) && value.includes(itemValue)
        ? value.filter(v => v !== itemValue)
        : [...(value || []), itemValue];
      onChange(newVal);
    } else {
      onChange(itemValue);
      setOpen(false);
      setSearch('');
    }
  };

  const isSelected = (itemValue) => {
    if (multiple) return Array.isArray(value) && value.includes(itemValue);
    return value === itemValue;
  };

  const displayText = getDisplayText();
  const isPlaceholder = displayText === placeholder;
  const hasValue = !isPlaceholder;

  return (
    <div
      className={`dropdown-field ${open ? 'open' : ''} ${hasValue ? 'has-value' : ''} ${error ? 'fr-error' : ''}`}
      ref={ref}
    >
      <button
        type="button"
        className={`dropdown-field-trigger ${size === 'lg' ? 'dropdown-field-trigger-lg' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={`dropdown-field-selected-text ${isPlaceholder ? 'dropdown-field-placeholder' : ''}`}>
          {displayText}
        </span>
        <i className="bi bi-chevron-down dropdown-field-arrow"></i>
      </button>

      <div className="dropdown-field-list" role="listbox">
        {searchable && (
          <div className="dropdown-field-search">
            <i className="bi bi-search dropdown-field-search-icon"></i>
            <input
              type="text"
              className="dropdown-field-search-input"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}

        {filteredGroups && filteredGroups.map(group => (
          <div key={group.group}>
            <div className="dropdown-field-group-label">{group.group}</div>
            {group.items.map(item => (
              <div
                key={item.value}
                className={`dropdown-field-option ${isSelected(item.value) ? 'dropdown-field-option--selected' : ''} ${item.disabled ? '' : ''}`}
                data-disabled={item.disabled ? 'true' : undefined}
                onClick={() => !item.disabled && handleSelect(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        ))}

        {filteredOptions && !multiple && filteredOptions.map(item => (
          <div
            key={item.value}
            className={`dropdown-field-option ${isSelected(item.value) ? 'dropdown-field-option--selected' : ''}`}
            onClick={() => handleSelect(item.value)}
          >
            {item.label}
          </div>
        ))}

        {filteredOptions && multiple && filteredOptions.map(item => (
          <div key={item.value} className="dropdown-field-check">
            <label>
              <input
                type="checkbox"
                checked={isSelected(item.value)}
                onChange={() => handleSelect(item.value)}
              />
              <span>{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownField;
