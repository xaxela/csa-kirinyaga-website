// Base URL for the API endpoints
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * ApiService class provides methods to interact with the backend API.
 * It handles fetching, creating, and deleting records for various tables.
 */
class ApiService {
  /**
   * Fetches data from a specified table.
   * @param tableName - The name of the table to fetch data from.
   * @returns A promise that resolves to an array of records.
   */
  async fetchTableData(tableName: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new record in the specified table.
   * @param tableName - The name of the table to create the record in.
   * @param data - The data for the new record.
   * @returns A promise that resolves to the created record.
   */
  async createRecord(tableName: string, data: Record<string, any>): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a record from the specified table by ID.
   * @param tableName - The name of the table to delete the record from.
   * @param id - The ID of the record to delete.
   * @returns A promise that resolves to the response from the server.
   */
  async deleteRecord(tableName: string, id: string | number): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/${tableName}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw error;
    }
  }

  // Specific methods for different tables

  /**
   * Fetches all members.
   * @returns A promise that resolves to an array of members.
   */
  async getMembers(): Promise<any[]> {
    return this.fetchTableData('members');
  }

  /**
   * Fetches all events.
   * @returns A promise that resolves to an array of events.
   */
  async getEvents(): Promise<any[]> {
    return this.fetchTableData('events');
  }

  /**
   * Fetches all contributions.
   * @returns A promise that resolves to an array of contributions.
   */
  async getContributions(): Promise<any[]> {
    return this.fetchTableData('contributions');
  }

  /**
   * Fetches all roles.
   * @returns A promise that resolves to an array of roles.
   */
  async getRoles(): Promise<any[]> {
    return this.fetchTableData('roles');
  }

  /**
   * Fetches all sub-groups.
   * @returns A promise that resolves to an array of sub-groups.
   */
  async getSubGroups(): Promise<any[]> {
    return this.fetchTableData('sub_groups');
  }

  /**
   * Fetches all member roles.
   * @returns A promise that resolves to an array of member roles.
   */
  async getMemberRoles(): Promise<any[]> {
    return this.fetchTableData('member_roles');
  }

  /**
   * Fetches all event attendance records.
   * @returns A promise that resolves to an array of event attendance.
   */
  async getEventAttendance(): Promise<any[]> {
    return this.fetchTableData('event_subgroup_attendance');
  }

  /**
   * Pools all data from all tables in the database.
   * @returns A promise that resolves to an object containing all tables and their data.
   */
  async poolAllData(): Promise<Record<string, any[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error pooling all data:', error);
      throw error;
    }
  }

  // Create methods

  /**
   * Creates a new member.
   * @param memberData - The data for the new member.
   * @returns A promise that resolves to the created member.
   */
  async createMember(memberData: Record<string, any>): Promise<any> {
    return this.createRecord('members', memberData);
  }

  /**
   * Creates a new event.
   * @param eventData - The data for the new event.
   * @returns A promise that resolves to the created event.
   */
  async createEvent(eventData: Record<string, any>): Promise<any> {
    return this.createRecord('events', eventData);
  }

  /**
   * Creates a new contribution.
   * @param contributionData - The data for the new contribution.
   * @returns A promise that resolves to the created contribution.
   */
  async createContribution(contributionData: Record<string, any>): Promise<any> {
    return this.createRecord('contributions', contributionData);
  }

  // Delete methods

  /**
   * Deletes a member by ID.
   * @param memberId - The ID of the member to delete.
   * @returns A promise that resolves to the response from the server.
   */
  async deleteMember(memberId: string | number): Promise<any> {
    return this.deleteRecord('members', memberId);
  }

  /**
   * Deletes an event by ID.
   * @param eventId - The ID of the event to delete.
   * @returns A promise that resolves to the response from the server.
   */
  async deleteEvent(eventId: string | number): Promise<any> {
    return this.deleteRecord('events', eventId);
  }

  /**
   * Deletes a contribution by ID.
   * @param contributionId - The ID of the contribution to delete.
   * @returns A promise that resolves to the response from the server.
   */
  async deleteContribution(contributionId: string | number): Promise<any> {
    return this.deleteRecord('contributions', contributionId);
  }
}

export default new ApiService();
