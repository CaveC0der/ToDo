import { FC } from 'react';
import { IFilter } from '../../types/IFilter';
import { Form, InputGroup } from 'react-bootstrap';
import { SortKeys } from '../../constants/sort';

interface FilterProps {
  filter: IFilter;
  setFilter: (_: IFilter) => void;
}

const Filter: FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div className='d-flex me-2'>
      <InputGroup className='me-2'>
        <InputGroup.Text id='search-sort-select'>Sort:</InputGroup.Text>
        <Form.Select
          value={filter.sort}
          onChange={e => setFilter({ ...filter, sort: e.target.value })}
          aria-describedby='search-sort-select'
        >
          <option disabled value=''>Choose</option>
          {SortKeys.map(key =>
            <option key={key} value={key}>{key}</option>,
          )}
        </Form.Select>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text id='search-query-input'>Search:</InputGroup.Text>
        <Form.Control
          placeholder='query'
          value={filter.query}
          onChange={e => setFilter({ ...filter, query: e.target.value })}
          aria-describedby='search-query-input'
        />
      </InputGroup>
    </div>
  );
};

export default Filter;
