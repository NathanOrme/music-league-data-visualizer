import type {
  Entry,
  EntryType,
  Item,
  Query,
  QueryFieldsProps,
  QueryResult,
  ResultsProps,
} from '../DiscogsTypes';

describe('DiscogsTypes', () => {
  test('should create a valid Query object', () => {
    const query: Query = {
      id: 1,
      artist: 'Artist Name',
      barcode: '123456789',
      album: 'Album Title',
      track: 'Track Title',
      format: 'CD',
      country: 'USA',
      types: 'ep',
    };
    expect(query.id).toBe(1);
    expect(query.artist).toBe('Artist Name');
    expect(query.barcode).toBe('123456789');
    expect(query.album).toBe('Album Title');
    expect(query.track).toBe('Track Title');
    expect(query.format).toBe('CD');
    expect(query.country).toBe('USA');
    expect(query.types).toBe('ep');
  });

  test('should create a valid QueryFieldsProps object', () => {
    const onQueriesChange = (queries: Query[]) => queries;
    const queryProps: QueryFieldsProps = { onQueriesChange };

    const sampleQueries: Query[] = [{ artist: 'Artist' }];
    expect(typeof queryProps.onQueriesChange).toBe('function');
    expect(queryProps.onQueriesChange(sampleQueries)).toEqual(
      sampleQueries,
    );
  });

  test('should create a valid Entry object', () => {
    const entry: Entry = {
      id: 'entry1',
      title: 'Record Title',
      format: ['Vinyl'],
      country: 'UK',
      year: '2020',
      uri: 'http://example.com',
      numberForSale: 5,
      lowestPrice: 20.5,
    };

    expect(entry.id).toBe('entry1');
    expect(entry.title).toBe('Record Title');
    expect(entry.format).toContain('Vinyl');
    expect(entry.country).toBe('UK');
    expect(entry.year).toBe('2020');
    expect(entry.uri).toBe('http://example.com');
    expect(entry.numberForSale).toBe(5);
    expect(entry.lowestPrice).toBe(20.5);
  });

  test('should create a valid QueryResult object', () => {
    const queryResult: QueryResult = {
      results: {
        someKey: [
          {
            id: 'id1',
            title: 'Test Title',
            format: ['Digital'],
            country: 'Canada',
            year: '2019',
            uri: 'http://test.com',
            numberForSale: 2,
            lowestPrice: 15,
          },
        ],
      },
    };

    expect(queryResult.results).toHaveProperty('someKey');
    expect(Array.isArray(queryResult.results.someKey)).toBeTruthy();
    expect(queryResult.results.someKey[0].title).toBe('Test Title');
  });

  test('should create a valid ResultsProps object', () => {
    const resultsProps: ResultsProps = {
      response: [
        {
          results: {
            key1: [
              {
                id: 'e1',
                title: 'Title 1',
                format: ['CD'],
                country: 'USA',
                year: '2018',
                uri: 'http://example1.com',
                numberForSale: 3,
                lowestPrice: null,
              },
            ],
          },
        },
      ],
    };

    expect(Array.isArray(resultsProps.response)).toBeTruthy();
    expect(resultsProps.response[0].results).toHaveProperty('key1');
  });

  test('should create a valid Item object', () => {
    const item: Item = {
      title: 'Item Title',
      lowestPrice: 10,
      numberForSale: 5,
      country: 'Germany',
      uri: 'http://item.com',
    };

    expect(item.title).toBe('Item Title');
    expect(item.lowestPrice).toBe(10);
    expect(item.numberForSale).toBe(5);
    expect(item.country).toBe('Germany');
    expect(item.uri).toBe('http://item.com');
  });

  test('should create a valid EntryType object', () => {
    const entryType: EntryType = {
      id: 'entryType1',
      title: 'Entry Type Title',
      format: ['LP'],
      country: 'France',
      year: '2017',
      uri: 'http://entrytype.com',
      numberForSale: 4,
      lowestPrice: 30,
    };

    expect(entryType.id).toBe('entryType1');
    expect(entryType.title).toBe('Entry Type Title');
    expect(entryType.format).toContain('LP');
    expect(entryType.country).toBe('France');
    expect(entryType.year).toBe('2017');
    expect(entryType.uri).toBe('http://entrytype.com');
    expect(entryType.numberForSale).toBe(4);
    expect(entryType.lowestPrice).toBe(30);
  });
});
