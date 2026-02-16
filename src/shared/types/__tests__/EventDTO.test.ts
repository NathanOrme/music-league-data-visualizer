import type { EventDTO } from '@/shared/types/EventDTO';

describe('EventDTO', () => {
  it('should create an EventDTO with only the required property', () => {
    const event: EventDTO = {
      eventDate: '2023-10-10',
    };

    expect(event.eventDate).toBe('2023-10-10');
    expect(event.id).toBeUndefined();
    expect(event.eventTheme).toBeUndefined();
    expect(event.albums).toBeUndefined();
    expect(event.eventNotes).toBeUndefined();
  });

  it('should allow all properties to be defined', () => {
    const event: EventDTO = {
      id: 1,
      eventDate: '2023-10-10',
      eventTheme: 'Autumn Festival',
      albums: [],
      eventNotes: 'Seasonal event with live music',
    };

    expect(event.id).toBe(1);
    expect(event.eventDate).toBe('2023-10-10');
    expect(event.eventTheme).toBe('Autumn Festival');
    expect(Array.isArray(event.albums)).toBe(true);
    expect(event.eventNotes).toBe('Seasonal event with live music');
  });
});
