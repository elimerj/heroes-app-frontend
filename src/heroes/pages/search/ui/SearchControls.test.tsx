import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

const renderSearchControl = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>
  );
};

describe('SearchControls', () => {
  test('should render with default values', () => {
    const { container } = renderSearchControl();
    expect(container).toMatchSnapshot();
  });

  test('should set input value when search param name is set', () => {
    renderSearchControl(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...'
    );
    expect(input.getAttribute('value')).toBe('Batman');
  });
  test('should change param when input is changed and enter is pressed ', () => {
    renderSearchControl(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...'
    );
    expect(input.getAttribute('value')).toBe('Batman');

    fireEvent.change(input, { target: { value: 'Superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.getAttribute('value')).toBe('Superman');
  });

  test('should change params strength when slider is changed', () => {
    renderSearchControl(['/?name=Batman&active-accordion=advance-filters']);

    const slider = screen.getByRole('slider');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
    screen.debug(slider);
  });

  test('should accordion to be open when active-accordion param is set', () => {
    renderSearchControl(['/?name=Batman&active-accordion=advance-filters']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');
    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });

  test('should accordion to be closed when active-accordion param is not set', () => {
    renderSearchControl(['/?name=Batman']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');
    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});
